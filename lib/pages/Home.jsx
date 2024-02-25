import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
            <Text style={styles.header}>வணக்கம்</Text>

            <TouchableOpacity onPress={() => { navigation.push('PangaliList') }} style={styles.button}>
                <Text style={styles.textTamil}>பங்காளி பட்டியல்</Text>
                <Text style={styles.text}>Pangali List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.push('#') }} style={styles.button}>
                <Text style={styles.textTamil}>பெண்கள் பட்டியல் </Text>
                <Text style={styles.text}>Female List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.push('NewEvent') }} style={styles.button}>
                <Text style={styles.textTamil}>புதிய நிகழ்வு</Text>
                <Text style={styles.text}>New Event</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.push('EventList') }} style={styles.button}>
                <Text style={styles.textTamil}>அனைத்து நிகழ்வுகளும்</Text>
                <Text style={styles.text}>All Events</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => { navigation.push('NoNetwork') }} style={styles.button}>
                <Text style={styles.textTamil}>எங்களை பற்றி</Text>
                <Text style={styles.text}>About Us</Text>
            </TouchableOpacity> */}
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color: 'black',
    },
    textTamil: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginHorizontal: 16,
        color: '#000',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginHorizontal: 16,
        color: '#000',
    },
    button: {
        backgroundColor: '#fbd3e9',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
    },
});