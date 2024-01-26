import React, { useEffect, useState } from 'react';
import { View, Button, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import firestore from '@react-native-firebase/firestore';

const GenerateList = ({route, navigation}) => {
    const [data, setData] = useState([]);
    
    console.log("Generate List Page");
    const eventName = route.params.eventName;
    console.log("Event Name : ", eventName);
    const filter =  route.params.filteredData;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const filteredData = route.params.filteredData;
        console.log("Filtered Data : ", filteredData);
        console.log('Fetching data...');
        if(filteredData == 'all'){
            const collectionRef = firestore().collection(eventName);
            const snapshot = await collectionRef.get(); 
            console.log('Snapshot fetched successfully!');
            const fetchedData = snapshot.docs.map((doc) => doc.data());
            setData(fetchedData);
            console.log('Data fetched successfully!', fetchedData);
        }
        else{
            const collectionRef = firestore().collection(eventName);
            const snapshot = await collectionRef.where('city', '==', filteredData).get(); 
            console.log('Snapshot fetched successfully!', filteredData);
            const fetchedData = snapshot.docs.map((doc) => doc.data());
            setData(fetchedData);
            console.log('Data fetched successfully!', fetchedData);
        }
        
    };


    const saveExcelFile = async (excelData) => {
        console.log('Saving excel file...');
        console.log('Filter ', filter);
        const currentDateTime = eventName+"-"+filter+"-"+new Date().toISOString().replace(/[-:.]/g, '');
        const fileName = `${currentDateTime}.xlsx`;
        const path = RNFS.DocumentDirectoryPath + `/${fileName}`;
        await RNFS.writeFile(path, excelData, 'base64'); // Change encoding type to 'base64'
        const downloadPath = RNFS.DownloadDirectoryPath + `/${fileName}`;
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
        <View style={style.container}>
            <TouchableOpacity onPress={()=>{convertToExcel()}} style={style.button}>
                <Text style={style.text}>Convert to Excel</Text>
            </TouchableOpacity>
            {/* <Button title="Convert to Excel" onPress={convertToExcel} /> */}
        </View>
    );
};

export default GenerateList;


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:16,
        backgroundColor: '#f9f5fa',
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color:'black',
        textDecorationLine: 'underline',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#f9f5fa',
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