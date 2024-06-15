import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Profile = ({navigation}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch the current user from Firebase Auth
        const currentUser = firebase.auth().currentUser;
        setUser(currentUser);
    }, []);

    const handleLogOut = async () => {
        try {
            await firebase.auth().signOut();
            AsyncStorage.removeItem('name');
            AsyncStorage.removeItem('email');
            AsyncStorage.removeItem('isFirstLaunch');
            setUser(null);
            navigation.reset
            ({
                index: 0,
                routes: [{ name: 'GoogleSign' }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={style.container}>
            {user ? (
                <View style={style.container}>
                    <Image source={{ uri: user.photoURL }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    <Text style={style.text}>Profile</Text>
                    <Text style={style.text}>Name: {user.displayName}</Text>
                    <Text style={style.text}>Email: {user.email}</Text>
                    
                    
                
                <TouchableOpacity style={style.button} onPress={() => {
                    handleLogOut();
                }
                }>
                    <Text style={style.text}>Sign Out</Text>
                </TouchableOpacity>
                </View>

            ) : (
                <Text style={style.text}>No Account found</Text>
            )}

        
        <TouchableOpacity style={style.footerButton} onPress={() => {
            navigation.navigate('LockScreen');
        }}>
            <Text style={style.footerText}>LogIn as ADMIN</Text>
        </TouchableOpacity>
        </View>
    );
};

export default Profile;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
        color: 'black',
    },
    button: {
        backgroundColor: '#fbd3e9',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    footerButton: {
        backgroundColor: '#fbd3e9',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'courier new',
        fontWeight: 'bold',

    },

   
});
