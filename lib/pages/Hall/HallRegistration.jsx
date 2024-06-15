import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar,  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const HallRegistration = ({ navigation, route }) => {

    const [selectedDate, setSelectedDate] = useState(route.params.selectedDate);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [amount, setAmount] = useState('');
    const [functionName, setFunctionName] = useState('');

    console.log('Selected date:', selectedDate);

    const handleNameChange = (value) => {
        setName(value);
    };

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    };

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handleCityChange = (value) => {
        setCity(value);
    };
    
    const handleAmountChange = (value) => {
        setAmount(value);
    };

    const handleSubmit = () => {
        // Validate the form data
        if (!name || !phoneNumber || !city) {
            alert('Please fill in all the required fields');
            return;
        }

        // Navigate to the profile page with the form data as parameters
        navigation.navigate('BillConfirmation', { name, phoneNumber, email, city, selectedDate, amount,functionName});
    };

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>
            <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />
            <View style={styles.container}>
                <Text style={styles.text}>Date Selected : {selectedDate}</Text>
                <Text style={styles.text}>Hall Registration</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={handleNameChange}
                    style={styles.input}
                    required
                />
                <TextInput
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    style={styles.input}
                    keyboardType='numeric'
                    required
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={handleEmailChange}
                    style={styles.input}
                />
                <Picker
                    selectedValue={city}
                    onValueChange={handleCityChange}
                    style={styles.input}
                >
                    <Picker.Item label="Select City" value="" />
                    <Picker.Item label="Singalandapuram" value="Singalandapuram" />
                    <Picker.Item label="Nama" value="Nama" />
                    <Picker.Item label="kiut" value="kiut" />
                </Picker>

                <Picker
                    selectedValue={functionName}
                    onValueChange={setFunctionName}
                    style={styles.input}
                >
                    <Picker.Item label="Select Function" value="" />
                    <Picker.Item label="திருமணம்" value="திருமணம்" />
                    <Picker.Item label="வளைகாப்பு" value="வளைகாப்பு" />
                    <Picker.Item label="others" value="Others" />
                </Picker>


                <TextInput
                    placeholder="Amount Paid"
                    value={amount}
                    onChangeText={handleAmountChange}
                    style={styles.input}
                    keyboardType='numeric'
                    required
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default HallRegistration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'purple',

    },
    input: {
        width: 300,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'purple',
        borderRadius: 5,
        
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: 'purple',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },


});