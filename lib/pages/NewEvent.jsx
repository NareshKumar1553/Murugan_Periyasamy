import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from "react-native-linear-gradient";
import firestore from '@react-native-firebase/firestore';
import DatePicker from '@react-native-community/datetimepicker';
import LoadingAnime from '../animation/LoadingAnime';

const NewEvent = ({navigation}) => {
    const [text, setText] = useState('');
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState('2024-06-09');
    const [datePickerVisible, setDatePickerVisible] = useState(false);

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
        if (text.length === 0) {
            Alert.alert("Error : Enter the Event Name");
            return;
        }
        if (!isChecked1 && !isChecked2) {
            Alert.alert("Select the List");
            return;
        }

        try {
            setIsLoading(true);

            // Store the text and checkbox value in AsyncStorage
            await AsyncStorage.setItem('eventName', text);
            await AsyncStorage.setItem('pangali', isChecked1.toString());
            await AsyncStorage.setItem('female', isChecked2.toString());
            await AsyncStorage.setItem('eventDate', date);

            // Clear the input fields
            setText('');
            setIsChecked1(false);
            setIsChecked2(false);

            const pangaliParentSnapshot = await firestore()
                .collection('PangaliParent')
                .get();

            pangaliParentSnapshot.forEach(async (doc) => {
                const data = doc.data();
                await firestore().collection(text).doc(data.name).set({
                    ...data,
                    tax: 0
                });
            });

            await firestore().collection('events').doc(text).set({
                name: text,
                totalTax: 0,
                eventDate: date,
                pangali: isChecked1,
                female: isChecked2,
                totalExpense: 0
            });

            setIsLoading(false);

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
            setIsLoading(false);
            console.log('Error saving data:', error);
        }
    };

    if (isLoading) {
        return (
            <LoadingAnime/>
            // <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{flex:1}}>
            //     <View style={style.container}>
            //         <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
            //         <ActivityIndicator size="large" color="#0000ff" />
            //         <Text style={style.text}>Creating Event...{'\n'}Please Wait...{'\n'}It will Take few Seconds...</Text>
            //     </View>
            // </LinearGradient>
        );
    }

    return (
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

                <Text style={style.text}>Select the Event Date</Text>
                <Text style={style.textTamil}>நிகழ்வு தேதி தேர்வு செய்க</Text>
                <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={style.button}>
                    <Text style={style.buttonText}>Select Date</Text>
                </TouchableOpacity>
                {datePickerVisible && (
                    <DatePicker
                        value={new Date(date)}
                        mode='date'
                        display='default'
                        onChange={(event, selectedDate) => {
                            setDatePickerVisible(false);
                            if (selectedDate) {
                                setDate(selectedDate.toISOString().split('T')[0]);
                            }
                        }
                        }
                    />
                )}
                
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
