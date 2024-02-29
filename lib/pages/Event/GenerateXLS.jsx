import React from "react";
import { View, Text, StyleSheet, StatusBar, Alert, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import XLSX from "xlsx";
import RNFS from "react-native-fs";


const GenerateXLS = ({route,navigation}) => {
    const data = route.params.data;
    const eventName = route.params.eventName;
    const name = route.params.name;

    

    const saveExcelFile = async (excelData) => {
        console.log('Saving excel file...');
        const currentDateTime = `${eventName}-${name}-${new Date().toISOString().replace(/[-:.]/g, '')}`;
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
        const columns = ['name', 'city', 'tax']; // Add more columns as needed
        const worksheet = XLSX.utils.json_to_sheet(data, { header: columns });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SriPeriyasamyThirukovil');
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


export default GenerateXLS;

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