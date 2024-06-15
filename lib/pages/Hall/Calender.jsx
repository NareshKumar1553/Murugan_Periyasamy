import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { firebase } from '@react-native-firebase/app';
import Dialog from 'react-native-dialog';
import SmsAndroid from 'react-native-get-sms-android';

const Calender = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [payment, setPayment] = useState('')

    useEffect(() => {
        
        const fetchEventDates = async () => {
            try {
                const eventDatesSnapshot = await firebase.firestore().collection('EventDates').get();
                const eventDates = {};
                eventDatesSnapshot.forEach((doc) => {
                    const date = doc.data().date;
                    eventDates[date] = { selected: true, marked: true, selectedColor: 'pink' };
                });
                setMarkedDates(eventDates);
            } catch (error) {
                console.log('Error fetching event dates:', error);
            }
        };

        fetchEventDates();
    }, []);

    

    const handleDayPress = (day) => {
        // Extract the date in your preferred format
        const selectedDate = day.dateString; // Format: 'YYYY-MM-DD'
      
        // Navigate to the registration page with the selectedDate as a parameter
        navigation.navigate('HallRegistration', { selectedDate: selectedDate });
      };

    return (
        <View style={{ flex: 1, backgroundColor: 'pink', paddingTop:30}}>
            <CalendarList
                markedDates={markedDates}
                onDayPress={handleDayPress}
            />
            
            <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fabButton} onPress={() => { 
                    navigation.push('HallBookingList',{name: name, phoneNumber: phoneNumber, payment: payment})
                    }}>
                    <Image source={require('../../assets/list.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Calender;

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fabButton: {
        backgroundColor: 'pink',
        borderRadius: 50,
        padding: 10,
    },
});