import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        console.log("Home Screen"),
        <View style={style.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
            <Text style={style.header}>வணக்கம்</Text>
            
            <TouchableOpacity onPress={()=>{navigation.push('PangaliList')}} style={style.button}>
                <Text style={style.textTamil}>பங்காளி பட்டியல்</Text>
                <Text style={style.text}>Pangali List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.push('#')}} style={style.button}>
                <Text style={style.textTamil}>பெண்கள் பட்டியல் </Text>
                <Text style={style.text}>Female List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.push('NewEvent')}} style={style.button}>
                <Text style={style.textTamil}>புதிய நிகழ்வு</Text>
                <Text style={style.text}>New Event</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.push('test1')}} style={style.button}>
                <Text style={style.textTamil}>புதிய நிகழ்வு</Text>
                <Text style={style.text}>Test</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:16,
        backgroundColor: '#f9f5fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color:'black',
        textDecorationLine: 'underline',
    },
    textTamil: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
        textDecorationLine: 'underline',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black'
    },
    button: {
        backgroundColor: '#eed2f7',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
    },
});