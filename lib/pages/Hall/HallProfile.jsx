import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HallProfile = ({navigation, route}) => {
    const {name, phoneNumber, payment} = route.params;

    return (
        <View style={style.container}>
            <Image source={require('../../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text style={style.text}>Profile</Text>
            <Text style={style.text}>Name: {name}</Text>
            <Text style={style.text}>Phone Number: {name}</Text>
            <Text style={style.text}>Amount Paid : {payment}</Text>
        </View>
    );
};

export default HallProfile;

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
   
});
