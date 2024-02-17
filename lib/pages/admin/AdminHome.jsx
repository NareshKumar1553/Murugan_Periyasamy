import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AdminHome = ({ navigation }) => {
    console.log("Admin Home Screen");

    const handleNavigation = (screen) => {
        navigation.push(screen);
    };

    const handleFemaleNavigation = (screen) => {
        
    };

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
            <Text style={styles.header}>வணக்கம்</Text>
            <Text style={styles.header}>Welome, Admin</Text>
            <TouchableOpacity onPress={() => handleNavigation('AdminPangaliList')} style={styles.button}>
                <Text style={styles.textTamil}>பங்காளி பட்டியல்</Text>
                <Text style={styles.text}>Pangali List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation('#')} style={styles.button}>
                <Text style={styles.textTamil}>பெண்கள் பட்டியல்</Text>
                <Text style={styles.text}>Female List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.push('NewChild',{gender:'male'});}} style={styles.button}>
                <Text style={styles.textTamil}>புதிய பங்காளி</Text>
                <Text style={styles.text}>Add Pangali</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.push('NewChild',{gender:'female'});}} style={styles.button}>
                <Text style={styles.textTamil}>புதிய பெண்கள்</Text>
                <Text style={styles.text}>Add Female</Text>
            </TouchableOpacity>

            
        </LinearGradient>
    );
};

export default AdminHome;

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
        marginLeft: 16,
        marginRight: 16,
        color: '#000',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
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