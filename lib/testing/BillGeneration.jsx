import React, { useState } from 'react';
import { View, Text, TextInput, Button, Linking } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const Invoice = ({ route }) => {
    
    const {customerName, bookingDate, totalAmount} = route.params;

    

    const generateBill = () => {
        // Step 1: Create the bill document
        createBillDocument(customerName, bookingDate, totalAmount);
    };

    const createBillDocument = (customerName, bookingDate, totalAmount) => {
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
    </style>
</head>
<body>
    <div class="invoice">
        <div class="invoice-header">
            <h1>ஸ்ரீ பெரியசாமி காமாட்சி அம்மன் கோவில் </h1>
            <img src= '../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png' alt="Sripuram Logo" width="100">
        </div>
        <h2>மண்டப முன்பதிவு</h1>
        <div class="invoice-subHeader">
            <div class="invoice-details-left">
                <p>Name : Naresh Kumar S</p>
                <p>City : Sin</p>
            </div>

            <div class="invoice-details-right">
                <script>
                    var currentDate = new Date();
                    var year = currentDate.getFullYear();
                    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    var day = currentDate.getDate().toString().padStart(2, '0');
                    var invoiceNumber = 'INV-' + year + month + day;
                    document.write('<p>Invoice Number: ' + invoiceNumber + '</p>');
                </script>
                <p>Date: 2022-01-01</p>
            </div>
        </div>
        <div class="details">
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${customerName}</td>
                        <td>${bookingDate}</td>
                        <td>${Time}</td>
                        <td>₹${Price}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="invoice-total">
            <p>Total: </p>
        </div>
    </div>
</body>
</html>`;

        // Generate the PDF using react-native-html-to-pdf
        const options = {
            html: htmlContent,
            fileName: 'invoice',
            directory: 'Documents',
        };

        const sendBillToCustomer = (billUrl) => {
            // Replace '+919659020514' with the customer's phone number
            const phoneNumber = '+919659020514';
            const message = `Dear customer, thank you for your booking. The total cost is ... You can download your invoice here: ${billUrl}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
          
            // Open the URL to send the message via WhatsApp
            Linking.openURL(whatsappUrl).catch((err) => console.error('An error occurred', err));
          };

        RNHTMLtoPDF.convert(options)
            .then(filePath => {
                console.log('PDF generated:', filePath);
               
                sendBillToCustomer(filePath);
            })
            .catch(error => {
                console.error('Failed to generate PDF:', error);
            });
    };
    return (
        <View style={{backgroundColor:'black'}}>
            <Text>Bill Generated Successful...</Text>
            <Text>Customer Name: {customerName}</Text>
            <Text>Booking Date: {bookingDate}</Text>
            <Text>Total Amount: {totalAmount}</Text>
            

            <Button title="Generate Bill" onPress={generateBill} />
        </View>
    );
};

export default Invoice;
