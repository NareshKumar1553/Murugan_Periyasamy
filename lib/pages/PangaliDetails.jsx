import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';

const PangaliDetail = ({ navigation,route }) => {
    const { phno, tax, name, city, key } = route.params.event;
   

    return (
        <View style={style.container}>
            <Image
                source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
                style={{ width: 200, height: 200 }}
            />
            <Text style={style.textName}>Name: {name}</Text>
            <Text style={style.textCity}>City: {city}</Text>
            <Text style={style.textPhno}>Phone Number: {phno}</Text>
            
        </View>
    );
};

export default PangaliDetail;

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