import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from "react-native-linear-gradient";

const NewEvent = ({navigation}) => {
    const [text, setText] = useState('');
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleTextChange = (value) => {
        setText(value);
    };


    const handleCheckbox1Change = () => {
        setIsChecked1(!isChecked1);
    };

    const handleCheckbox2Change = () => {
        setIsChecked2(!isChecked2);
    };

    const handleSave = async () => {
        if(text.length == 0){
            alert("Error : Enter the Event Name");
            return;
        }
        if(!isChecked1 && !isChecked2){
            alert("Select the List");
            return;
        }

        try {
            // Store the text and checkbox value in AsyncStorage
            await AsyncStorage.setItem('eventName', text);
            await AsyncStorage.setItem('pangali', isChecked1.toString());
            await AsyncStorage.setItem('female', isChecked2.toString());
            // await AsyncStorage.setItem('isChecked', isChecked.toString());

            // Clear the input fields
            setText('');
            setIsChecked1(false);
            setIsChecked2(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Event' }],
              });
            // Show a success message or navigate to another screen
            console.log('Data saved successfully!');
            Alert.alert(
                'Event Created successfully!',
                '',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('Error saving data:', error);
        }
    };


    return (

        console.log("New Event"),
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{flex:1}}>

        <View style={style.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />

            <Text style={style.text}>Enter the Event Name</Text>
            <Text style={style.textTamil}>புதிய நிகழ்வு பெயர்</Text>
            <TextInput
                value={text}
                onChangeText={handleTextChange}
                placeholder="Enter Event Name..."
                style={style.input}
            />
            <Text style={style.text}>Pangali List</Text>
            <CheckBox value={isChecked1} onValueChange={handleCheckbox1Change} style={style.CheckBox}/>
            <Text style={style.text}>Female List</Text>
            <CheckBox value={isChecked2} onValueChange={handleCheckbox2Change} style={style.CheckBox}/>
            <TouchableOpacity onPress={handleSave} style={style.button}>
                <Text style={style.buttonText}>Create</Text>
            </TouchableOpacity>
            
        </View>

        </LinearGradient>
    );
};

export default NewEvent;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        width: 300,
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fbd3e9',
        borderRadius: 15,
        fontSize: 18,
        color:'black',
    },
    CheckBox: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fbd3e9',
        borderRadius: 25,
        fontSize: 18,
        color:'black',
    },
    button: {
        backgroundColor: '#fbd3e9',
        borderRadius: 25,
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        margin: 10,
        width: 300,
        height: 50,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textTamil: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
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
        color:'black',
        padding: 10,

    },
});