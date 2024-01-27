import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, StatusBar } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const LockPage = ({navigation}) => {
    const [pin, setPin] = useState('');
    const [isEventExist, setIsEventExist] = useState(false);
    console.log('LoginPage');


    useEffect(() => {
        AsyncStorage.getItem('eventName').then((value) => {
            console.log('Pin:', value);
            if(value === null){
                setIsEventExist(false);
            }
            else{
                setIsEventExist(true);
            } 
        });
    }, []);


    const handlePinChange = (pin) => {
        setPin(pin);
    }

    const handlePinComplete = async (pin) => {
       
        try {
            const storedPin = '9659';
            if (storedPin === pin) {
                // Login successful
                console.log('Login successful');
                if(isEventExist){
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Event' }],
                      });
                }
                else{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                      });
                }
                
            } else {
                // Login failed
                Alert.alert('Error', 'Invalid pin');
                // setPin('');
                console.log('Invalid pin');
            }
        } catch (error) {
            console.log('Error :', error);
        }

        console.log('Pin entered:', pin);
        setPin('');
    };


    return (
        console.log("Lock Page"),
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{flex:1}}>
        <View style={style.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#f9f5fa" translucent = {true}/>

            <Text style={style.text}>Welcome to the Login Page</Text>
            <Text style={style.text}>Enter the Pin</Text>
            <SmoothPinCodeInput
                password
                mask = '*'
                value={pin}
                onTextChange={handlePinChange}
                onFulfill={handlePinComplete}
                autoFocus={true}
                cellSize={40}
                cellSpacing={10}
            />
        </View>

        </LinearGradient>
    );
};

export default LockPage;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'black'
    }
});
