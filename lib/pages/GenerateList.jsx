import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert, StatusBar } from 'react-native';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const GenerateList = ({ route, navigation }) => {
    const [data, setData] = useState([]);

    console.log("Generate List Page");
    const eventName = route.params.eventName;
    console.log("Event Name : ", eventName);
    const filter = route.params.filteredData;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        console.log('Fetching data...');
        let collectionRef = firestore().collection(eventName);
        if (filter !== 'all') {
            collectionRef = collectionRef.where('city', '==', filter);
        }
        const snapshot = await collectionRef.orderBy('city').get();
        console.log('Snapshot fetched successfully!');
        const fetchedData = snapshot.docs.map((doc) => doc.data());
        setData(fetchedData);
        console.log('Data fetched successfully!', fetchedData);
    };

    const saveExcelFile = async (excelData) => {
        console.log('Saving excel file...');
        const currentDateTime = `${eventName}-${filter}-${new Date().toISOString().replace(/[-:.]/g, '')}`;
        const fileName = `${currentDateTime}.xlsx`;
        const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.writeFile(path, excelData, 'base64');
        const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        await RNFS.moveFile(path, downloadPath);
        console.log('File downloaded successfully!', downloadPath);
        Alert.alert(
            'File downloaded successfully!',
            downloadPath,
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                },
            ],
            { cancelable: false },
        );
        navigation.pop();
    };

    const convertToExcel = () => {
        console.log('Converting to excel...');
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelData = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
        saveExcelFile(excelData, 'data.xlsx');
        console.log('Converted to excel successfully!');
    };

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{ flex: 1 }}>
            <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />
            <View style={styles.container}>
                <TouchableOpacity onPress={convertToExcel} style={styles.button}>
                    <Text style={styles.text}>Convert to Excel</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color: 'black',
        textDecorationLine: 'underline',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#f3e1f7',
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
});

export default GenerateList;
