import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventPangaliDetail = ({ navigation,route }) => {
    const { phno, tax, name, city, key } = route.params.event;
    const [taxInput, setTaxInput] = useState(tax);
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('eventName').then((value) => {
            console.log('Text:', value);
            setEventName(value);
        });
    }
    );
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
                log: 'Tax updated to ' + taxInput ,
                timestamp: firestore.FieldValue.serverTimestamp()
            });

            await firestore().collection('log').doc(eventName+key).set({
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
        <View style={style.container}>
            <Image
                source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
                style={{ width: 200, height: 200 }}
            />
            <Text style={style.textName}>Name: {name}</Text>
            <Text style={style.textCity}>City: {city}</Text>
            <Text style={style.textPhno}>Phone Number: {phno}</Text>
            <Text style={style.textTax}>Tax: {tax}</Text>
            <TextInput
                keyboardType='numeric'
                style={style.inputTax}
                value={taxInput}
                onChangeText={handleTaxChange}
            />
            <TouchableOpacity onPress={() => { handleUpdateTax() }} style={style.button}>
                <Text style={style.text}>Update Tax</Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default EventPangaliDetail;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
        backgroundColor: '#f9f5fa',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 200,
        marginTop: 16,
        borderRadius: 8,
        color: 'black',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },

    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
    },
    textCity: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
    },
    textPhno: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
    },
    textTax: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
    },
    inputTax: {
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
});