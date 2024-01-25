import React from 'react';
import { View, Text,StyleSheet, Image, TextInput } from 'react-native';

const EventPangaliDetail = ({ route }) => {
    const { phno, tax, name, city, key} = route.params.event;
    console.log("Name : ", name);
    return (
        <View style={style.container}>
            <Image source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')} style={{ width: 200, height: 200 }} />
            <Text style={style.textName}>Name: {name}</Text>
            <Text style={style.textCity}>City: {city}</Text>
            <Text style={style.textPhno}>Phone Number: {phno}</Text>
            <TextInput style={style.textTax}>Tax : {tax}</TextInput>
        </View>
    );
};

export default EventPangaliDetail;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop:16,
        backgroundColor: '#f9f5fa',
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
    },
    textCity: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
        
    },
    textPhno: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
        
    },
    textTax: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
       
    },
});