import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, Linking, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

const PangaliDetail = ({ navigation,route }) => {
    const { phno, tax, name, city, key, location } = route.params.event;
    const {latitude,longitude} = location;
    const url = 'https://www.google.com/maps/dir/?api=1&destination='+latitude+','+longitude+'&travelmode=driving';


    console.log("PangaliDetail.jsx",phno, tax, name, city, key, latitude, longitude,url);


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

   

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{flex:1}}>
        <View style={style.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
            <Image
                source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
                style={{ width: 200, height: 200 }}
            />
            <Text style={style.textName}>Name: {name}</Text>
            <Text style={style.textCity}>City: {city}</Text>
            <Text style={style.textPhno}>Phone Number: {phno}</Text>
            
        <TouchableOpacity onPress={() => {
                handlePhoneCall(phno);
            }}
            style={style.button}
            >
                <Text style={style.buttonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
                Linking.openURL(url);
            }}
            style={style.button}
            >
                <Text style={style.buttonText}>Navigate Me</Text>
        </TouchableOpacity>
        </View>
        </LinearGradient>
    );
};

export default PangaliDetail;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
        marginTop:20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#8bfca9',
        padding: 10,
        width: 200,
        marginTop: 16,
        borderRadius: 8,
        color: 'green',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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