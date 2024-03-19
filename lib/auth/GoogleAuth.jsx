import React, { useState } from 'react';
import { View, Button, StatusBar, TextInput, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
    webClientId: '435464759466-rav5un435ncf08db24f6dsrtq8t83963.apps.googleusercontent.com',
});

const GoogleAuth = ({ navigation }) => {
    const [photo, setPhoto] = useState('');
    
    const handleGoogleSignup = async () => {
        try {
            console.log('Google signup initiated...');
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);

            const userInfo = await GoogleSignin.getCurrentUser();
            const { name, email } = userInfo.user;

            // console.log('Google user info:', userInfo);

            if(photo === null) {
                setPhoto('');
            }

            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('isFirstLaunch', 'false');

            const userRef = firestore().collection('usersAuth').doc(auth().currentUser.uid);
            const userDoc = await userRef.get();

            if (userDoc.exists) {
                console.log('Existing user:', userDoc.data());
            } else {
                console.log('New user:', name, email, photo);
                await userRef.set({
                    name,
                    email,
                    photo,
                });
            }
            console.log('Google user info:', userInfo);
            console.log('Google user name:', name, email, photo);
            console.log('Google signup successful!');

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });

        } catch (error) {
            console.error('Google signup error:', error);
        }
    };


    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor={'#f9f5fa'} />
            <View style={styles.container}>
                <Image source={require('../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png')} style={{ width: 200, height: 200 }} />
                
                
                <GoogleSigninButton
                    style={{ width: '70%', height: 60, borderRadius: 24, marginTop: 20,}}
                    size={GoogleSigninButton.name === 'standard' ? GoogleSigninButton.Size.Standard : GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={handleGoogleSignup}
                    disabled={false}
                />

            <View style={styles.fabContainer}>
                        <TouchableOpacity style={styles.fabButton} onPress={() => { 
                            navigation.push('LockScreen')
                         }}>
                            <Image source={require('../assets/profile.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>

            </View>
        </LinearGradient>
    );
};

export default GoogleAuth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 10
    },
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fabButton: {
        backgroundColor: '#fbd3e9',
        padding: 10,
        borderRadius: 25,
    },

});