import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Linking, TouchableOpacity, StatusBar, Alert } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import firestore from '@react-native-firebase/firestore';

const PangaliEntry = ({ navigation, route }) => {
    const { phno, tax, name, city, key } = route.params.event;
    const [phoneNumber, setPhoneNumber] = useState(phno);

    const handleSave = () => {
        firestore()
            .collection('PangaliParent')
            .doc(name)
            .update({
                phno: phoneNumber,
            })
            .then(() => {
                console.log('Data saved successfully!');
                navigation.goBack();
                Alert.alert('Data saved successfully!');
            })
            .catch((error) => {
                console.error('Error saving data: ', error);
                Alert.alert('Error saving data: ', error);
                navigation.goBack();
            });
    };

    const handlePhoneCall = () => {
        console.log("Phone number:", phno);
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
            <TextInput
                style={styles.input}
                placeholder={phoneNumber}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType='numeric'
            />
            <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePhoneCall} style={styles.button}>
                <Text style={styles.buttonText}>Call</Text>
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
        backgroundColor: '#f9f5fa',
        padding: 10,
        width: 200,
        marginTop: 16,
        borderRadius: 8,
        color: 'black',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
});

export default PangaliEntry;
