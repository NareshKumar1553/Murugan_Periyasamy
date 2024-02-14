import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from "react-native-linear-gradient";

const EventPangaliDetail = ({ navigation, route }) => {
    const { phno, tax, name, city, key } = route.params.event;
    const [taxInput, setTaxInput] = useState(tax);
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('eventName').then((value) => {
            console.log('Text:', value);
            setEventName(value);
        });
    }, []);

    const handleTaxChange = (text) => {
        setTaxInput(text);
    };

    const handleUpdateTax = async () => {
        try {
            // Update tax to the database
            console.log("Updated tax:", taxInput);
            await firestore().collection(eventName).doc(key).update({
                tax: taxInput
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
            navigation.pop();
        } catch (error) {
            console.error("Error updating tax:", error);
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
            <Text style={styles.text}>Tax: {tax}</Text>
            <TextInput
                keyboardType='numeric'
                style={styles.input}
                value={taxInput}
                onChangeText={handleTaxChange}
            />
            <TouchableOpacity onPress={handleUpdateTax} style={styles.button}>
                <Text style={styles.buttonText}>Update Tax</Text>
            </TouchableOpacity>
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
        color: 'white',
    },
});

export default EventPangaliDetail;
