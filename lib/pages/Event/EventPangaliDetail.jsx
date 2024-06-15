import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Linking, Image, TextInput, Button, TouchableOpacity, Alert, StatusBar, PermissionsAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from "react-native-linear-gradient";
import SmsAndroid from 'react-native-get-sms-android';

const EventPangaliDetail = ({ navigation, route }) => {
    const { phno, tax, name, city, key } = route.params.event;
    const [taxInput, setTaxInput] = useState(tax);
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('eventName').then((value) => {
            console.log('Text:', value);
            setEventName(value);
        });
        requestSMSPermission();
    }, []);

    const requestSMSPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                    title: 'SMS Permission',
                    message: 'This app requires permission to send SMS.',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('SMS permission granted');
            } else {
                console.log('SMS permission denied');
            }
        } catch (error) {
            console.log('Error requesting SMS permission:', error);
        }
    };

    const handleTaxChange = (text) => {
        setTaxInput(text);
    };

    const handlePhoneCall = (phno) => {
        if(phno=="")
        {
            Alert.alert('Phone number not available', '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false});
        }
        else
        {
            Linking.canOpenURL('tel:' + phno).then(supported => {
                if (supported) {
                    Linking.openURL('tel:' + phno);
                } else {
                    console.log("Phone call not supported");
                    Alert.alert('Phone call not supported', '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false});
                    
                }
            }
            );
        }
    }

    const handleUpdateTax = async () => {
        try {
            // Update tax to the database
            console.log("Updated tax:", taxInput);
            await firestore().collection(eventName).doc(key).update({
                tax: taxInput
            });

            await firestore().collection('events').doc(eventName).update({
                totalTax: firestore.FieldValue.increment(taxInput - tax)
            });
            

            console.log("Tax updated successfully!");

            // Add log to the database
            await firestore().collection(eventName).doc(key).collection('log').add({
                log: 'Tax updated to ' + taxInput,
                timestamp: firestore.FieldValue.serverTimestamp()
            });

            await firestore().collection('log').doc(eventName + key).set({
                log: 'Tax updated to ' + taxInput + ' for ' + name + ' from ' + city,
                timestamp: firestore.FieldValue.serverTimestamp(),
                name: name,
                city: city,
                eventName: eventName,
            });

            console.log("Log added successfully!");

            Alert.alert(
                'Tax updated successfully!',
                '',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable: false },
            );
            Alert.alert(
                'Do you want to send receipt to ' + name + '?',
                '',
                [
                    {
                        text: 'Yes',
                        onPress: () => sendMessage(),
                    },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'),
                    },
                ],
                { cancelable: false },
            );
            navigation.pop();
        } catch (error) {
            console.error("Error updating tax:", error);
        }
    };

    const sendMessage = async () => {
        console.log('Sending message to ' + phno);
        let message = 'ஸ்ரீ பெரியசாமி காமாட்சி அம்மன் திருக்கோவில்,' +

                       '\n\nவணக்கம், '+ name + '!\n\n    நீங்கள் ஸ்ரீ பெரியசாமி காமாட்சி அம்மன் கோவிலுக்கு '+ eventName+' நன்கொடையாக கொடுக்கப்பட்ட தொகை ₹' + taxInput +'.'+ '\n    நன்றி,   \n\n '+eventName+' விழா குழுவினர்.';
        
                        
        try {
            SmsAndroid.autoSend(
                phno,
                
                message,

                (fail) => {
                    console.log('Failed with this error: ' + fail);
                },
                (success) => {
                    console.log('SMS sent successfully', success);
                },
            );
    }
    catch (error) {
        console.error("Error sending message:", error);
    }
    };
    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />

            <Image
                source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Name: {name}</Text>
            <Text style={styles.text}>City: {city}</Text>
            <Text style={styles.text}>Phone Number: {phno}</Text>
            <Text style={styles.text}>Tax: ₹{tax}</Text>
            <TextInput
                keyboardType='numeric'
                style={styles.input}
                value={taxInput}
                onChangeText={handleTaxChange}
            />
            <TouchableOpacity onPress={handleUpdateTax} style={styles.button}>
                <Text style={styles.buttonText}>Update Tax</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                handlePhoneCall(phno);
            }}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <View style={styles.fabContainer}>
                        <TouchableOpacity style={styles.fabButton} onPress={() => { 
                            navigation.push('Profile')
                         }}>
                            <Image source={require('../../assets/profile.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
    },
    input: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        width: 200,
        borderRadius: 8,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#fbd3e9',
        padding: 10,
        width: 200,
        marginTop: 16,
        borderRadius: 8,
        color: '#83a4d4',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    fabButton: {
        backgroundColor: '#fbd3e9',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default EventPangaliDetail;
