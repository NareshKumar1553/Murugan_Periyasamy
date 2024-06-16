import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking, StyleSheet, TouchableOpacity, StatusBar, Image, Alert, ActivityIndicator } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import LinearGradient from 'react-native-linear-gradient';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import SmsAndroid from 'react-native-get-sms-android';


const EventBillGeneration = ({ route }) => {
    const { name, tax, phno, eventName,city, eventDate } = route.params;
    const [billUrl, setBillUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [downloadFileURL, setDownloadFileURL] = useState(null);
    const [loading, setLoading] = useState(true); 

    console.log("Event Name : ",eventName);
    console.log("Event Date : ",eventDate);

    const selectedDate = new Date().toISOString().split('T')[0];

    const img = 'https://firebasestorage.googleapis.com/v0/b/sriperiyasamy-96.appspot.com/o/peri%5B1%5D.png?alt=media&token=6259cc87-8729-4527-bc44-ae6a8e039a7f';
    const footer = 'https://firebasestorage.googleapis.com/v0/b/sriperiyasamy-96.appspot.com/o/Footer%201.png?alt=media&token=819a6b49-7777-4f55-8258-765ee637eb5a';

    useEffect(() => {
        const init = async () => {
            try {
                await generateBill();
            } catch (error) {
                setError(error.message); // Assuming error has a message property
            } finally {
                setLoading(false); // Ensure loading is set to false after operation
            }
        };
    
        init();
    }, []);

    const generateBill = async () => {
        // Step 1: Create the bill document
        setLoading(true);
        try {
            // Step 1: Create the bill document
            await createBillDocument(name, selectedDate, tax);
            // After bill document is created, you might want to do additional steps here
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    const createBillDocument = async (name, selectedDate, tax) => {
        // Create the HTML content for the bill document
         const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .invoice {
            background-color: #f5f5f5;
            border-radius: 5px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
        }

        .invoice-subHeader {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .invoice-details-left {
            text-align: left;
        }

        .invoice-details-right {
            text-align: right;
        }

        .invoice-details-left p,
        .invoice-details-right p {
            margin: 0;
        }

        .invoice-details-left p {
            margin-bottom: 5px;
        }

        .invoice-details-right p {
            margin-bottom: 5px;
        }

        .invoice-details-right p:last-child {
            margin-bottom: 0;
        }

        .invoice-header,
        .invoice-subHeader {
            display: flex;
            justify-content: space-between;
        }

        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .invoice-header h1 {
            font-size: 24px;
            color: #333;
            margin: 0;
        }

        .invoice-details {
            margin-bottom: 20px;
        }

        .invoice-details p {
            margin: 0;
        }

        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .invoice-table th,
        .invoice-table td {
            padding: 10px;
            border: 1px solid #ddd;
        }

        .invoice-table th {
            background-color: #f5f5f5;
            text-align: left;
        }

        .invoice-total {
            text-align: right;
        }

        .invoice-total p {
            font-weight: bold;
            margin: 0;
        }
        .invoice-footer {
            margin-top: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .invoice-footer img {
            max-width: 80%;
        }

    </style>
</head>
<body>
    <div class="invoice">
        <div class="invoice-header">
            <h1>ஸ்ரீ பெரியசாமி காமாட்சி அம்மன் கோவில் </h1>
            <img src= ${img} alt="Murugan Logo" width="100" />
        </div>
        <h2>${eventName} ரசீது</h2>
        <div class="invoice-subHeader">
            <div class="invoice-details-left">
                <p>Name : ${name}</p>
                <p>City : ${city}</p>
                <p>Phone Number : ${phno}</p>
            </div>

            <div class="invoice-details-right">
                <p>Invoice Number: ${generateInvoiceNumber()}</p>
                <p>Date: ${getCurrentDate()}</p>
                <p>Function: ${eventName}</p>
            </div>
        </div>
        <div class="details">
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Function Date</th>
                        <th>Phone Number</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${name}</td>
                        <td>${eventDate}</td>
                        <td>${phno}</td>
                        <td>₹${tax}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="invoice-total">
            <p>Total: ₹${tax}</p>
        </div>

        <div class="invoice-footer">
            <p>நன்றி!</p>
            <img src=${footer} alt="Location">
            <div class="invoice-footer-queries">
                <p class="item">For any queries, please contact us at:</p>
                <p class="item">Phone:+91 99940 54066</p>
                <a class="item" href="https://nareshkumar.zgen.tech"><p>About US</p></a>
            </div>
        </div>
    </div>
</body>
</html>`;

        // Generate the PDF using react-native-html-to-pdf
        const options = {
            html: htmlContent,
            fileName: 'invoice',
            directory: 'Documents',
            pageSize: 'A4',
            orientation: 'landscape',
        };

        RNHTMLtoPDF.convert(options)
            .then((filePath) => {
                console.log('PDF generated:', filePath);
                uploadBillToFirebaseStorage(filePath.filePath);
            })
            .catch((error) => {
                console.error('Failed to generate PDF:', error);
            });
    };

    const readFile = async (filePath) => {
        console.log('Reading file:', filePath);
        try {
            const content = await RNFS.readFile(filePath, 'base64');
            return content;
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    };

    const uploadBillToFirebaseStorage = async (filePath) => {
        setUploading(true);
        setError(null);
        console.log('Uploading bill to Firebase Storage:', filePath);
        try {
            const content = await readFile(filePath);
            const storageRef = storage().ref();
            const billRef = storageRef.child(`${eventName}_Bills/Sri Periyasamy Kovil_${name}_${eventName}_${Date.now()}.pdf`);
            await billRef.putString(content, 'base64', { contentType: 'application/pdf' });

            const downloadURL = await billRef.getDownloadURL();
            console.log('Bill uploaded to Firebase Storage:', downloadURL);
            setDownloadFileURL(downloadURL);
            setUploading(false);

        } catch (error) {
            console.error('Error uploading bill:', error);
            setError(error.message);
            setUploading(false);
        }
    };

    const sendBillToCustomer = async (billUrl, sendSMS, sendWhatsApp, phoneNumber) => {
        console.log('Sending bill to customer:', billUrl);
        phoneNumber = '+91'+phno;
        console.log('Phone number:', phoneNumber);
        const message = 'ஸ்ரீ பெரியசாமி காமாட்சி அம்மன் திருக்கோவில்,' +

                       '\n\nவணக்கம் '+ name + ',!\n\n    நீங்கள் ஸ்ரீ பெரியசாமி காமாட்சி அம்மன் கோவிலுக்கு '+ eventName+' நன்கொடையாக கொடுக்கப்பட்ட தொகை ₹' + tax +'.'+ '\n    நன்றி,   \n\n '+ eventName +' விழா குழுவினர்.\n\n\t For Bill \n\n'+ billUrl + '\n\n நன்றி!!!';
        if (sendSMS) {
            try {
                await SmsAndroid.autoSend(
                    phoneNumber,
                    message,
                    (fail) => {
                        console.log('Failed with this error: ' + fail);
                        Alert.alert('Error', 'Failed to send bill via SMS');
                    },
                    (success) => {
                        console.log('SMS sent successfully', success);
                        Alert.alert('Success', 'Bill sent successfully via SMS');
                    },
                );
            } catch (error) {
                console.error('Error sending message:', error);
        }
        }

        if (sendWhatsApp) {
            // Send WhatsApp message
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            Linking.openURL(whatsappUrl).catch((err) => console.error('An error occurred', err));
        }
    };

    const generateInvoiceNumber = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const invoiceNumber = 'INV-'+ eventName + year + month + day;
        return invoiceNumber;
    };

    const getCurrentDate = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        return currentDate;
    };

    return (
        console.log("Page : EventBillGeneration.jsx"),
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>
            <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />

            {loading ? (
            <ActivityIndicator style={styles.loading}/> // Show loading indicator while loading
        ) : error ? (
            <Text style={styles.error}>Error: {error.message}</Text> // Show error message if error exists
        ) : downloadFileURL ? (
            <View style={styles.container}>
                <Image source={require('../../../android/app/src/main/res/mipmap-xhdpi/ic_launcher.png')} style={styles.image} />
                <Text style={styles.text}>Bill Generated Successfully...</Text>
                <Text style={styles.text}>Name: {name}</Text>
                <Text style={styles.text}>Total Amount: ₹{tax}</Text>
                <Text style={styles.text}>City: {city}</Text>
                <Text style={styles.text}>Phone Number: {phno}</Text>

                <TouchableOpacity onPress={() => sendBillToCustomer(downloadFileURL, true, false, {phno})} style={styles.button}>
                    <Text style={styles.buttonText}>Send SMS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => sendBillToCustomer(downloadFileURL, false, true, {phno})} style={styles.button}>
                    <Text style={styles.buttonText}>Send WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => sendBillToCustomer(downloadFileURL, true, true, {phno})} style={styles.button}>
                    <Text style={styles.buttonText}>Send Both</Text>
                </TouchableOpacity>
                
            </View>
        ) :  null}
            
        </LinearGradient>
    );
};

export default EventBillGeneration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        margin: 5,
        color: 'black',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: 150,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    loading: {
        marginTop: 20,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },

});
