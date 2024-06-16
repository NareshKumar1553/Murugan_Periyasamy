import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HallProfile = ({navigation, route}) => {
    const { selectedDate: selectedDate} = route.params;
    console.log('Selected date:', selectedDate);

    const [hallBookings, setHallBookings] = useState([]);

    useEffect(() => {
        const fetchHallBookings = async () => {
            try {
                const snapshot = await firebase.firestore().collection('HallBooking').where('selectedDate', '==', selectedDate).get();
                const bookings = snapshot.docs.map(doc => doc.data());
                setHallBookings(bookings);
            } catch (error) {
                console.error('Error fetching hall bookings:', error);
            }
        };

        fetchHallBookings();
    }, []);

    console.log('Filtered bookings:', hallBookings);

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={style.container}>
        <StatusBar backgroundColor='#f9f5fa' barStyle='dark-content' />

        <View style={style.container}>
            <Text style={style.text}>Hall Booking Profile</Text>
            <Text style={style.text}>Selected Date: {selectedDate}</Text>
            <Text style={style.text}>Hall Bookings:</Text>
            {hallBookings.map((booking, index) => (
                <View key={index} style={{ marginVertical: 5 }}>
                    <Text style={style.text}>Name: {booking.name}</Text>
                    <Text style={style.text}>Phone Number: {booking.phoneNumber}</Text>
                    <Text style={style.text}>Email: {booking.email}</Text>
                    <Text style={style.text}>City: {booking.city}</Text>
                    <Text style={style.text}>Amount: {booking.amount}</Text>
                    <Text style={style.text}>Function Name: {booking.functionName}</Text>
                </View>
            ))}
            <TouchableOpacity
                style={{ backgroundColor: 'pink', padding: 10, borderRadius: 5, marginTop: 10 }}
                onPress={() => {
                    navigation.navigate('HallBookingList');
                }}
            >
                <Text style={{ color: 'white' }}>Go to Hall Booking List</Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
           
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
