import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, StatusBar } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const LockPage = ({navigation}) => {
    const [pin, setPin] = useState('');
    const [isEventExist, setIsEventExist] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('eventName').then((value) => {
            setIsEventExist(value !== null);
        });
    }, []);

    const handlePinChange = (pin) => {
        setPin(pin);
    }

    const handlePinComplete = async (pin) => {
        try {
            const storedPin = '9659';
            const AdminPin = '9623';
            if (pin === AdminPin) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AdminHome' }],
                });
                console.log('Admin Login');
            } else if (storedPin === pin) {
                console.log('Login successful');
                navigation.reset({
                    index: 0,
                    routes: [{ name: isEventExist ? 'Event' : 'Home' }],
                });
            } else {
                Alert.alert('Error', 'Invalid pin');
                console.log('Invalid pin');
            }
        } catch (error) {
            console.log('Error:', error);
        }
        setPin('');
    };

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={style.container}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#f9f5fa" translucent={true} />
            <Text style={style.text}>Welcome to the Login Page</Text>
            <Text style={style.text}>Enter the Pin</Text>
            <SmoothPinCodeInput
                password
                mask="*"
                value={pin}
                onTextChange={handlePinChange}
                onFulfill={handlePinComplete}
                autoFocus={true}
                cellSize={40}
                cellSpacing={10}
            />
        </LinearGradient>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black'
    }
});

export default LockPage;
