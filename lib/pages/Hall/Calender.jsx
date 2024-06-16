import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { firebase } from '@react-native-firebase/app';

const Calender = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [data, setData] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');
    const [payment, setPayment] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchEventDates = async () => {
            try {
                const eventDatesSnapshot = await firebase.firestore().collection('HallBooking').get();
                const eventDates = {};
                eventDatesSnapshot.forEach((doc) => {
                    const date = doc.data().selectedDate;                  
                    eventDates[date] = { selected: true, marked: true, selectedColor: 'pink' };
                });
                
                setMarkedDates(eventDates);
                setLoading(false); 
                console.log('Event dates:', eventDates);
            } catch (error) {
                console.log('Error fetching event dates:', error);
            }
        };

        fetchEventDates();
    }, []);

    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        if (markedDates[selectedDate]) {
            navigation.navigate('HallProfile', { selectedDate: selectedDate });
        } else {
            // If not booked, navigate to the HallRegistration screen
            navigation.navigate('HallRegistration', { selectedDate: selectedDate });
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            {loading ? ( // Show activity indicator while loading
                <ActivityIndicator size="large" color="pink" style={styles.activityIndicator} />
            ) : (
                <CalendarList markedDates={markedDates} onDayPress={handleDayPress} />
            )}

            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fabButton}
                    onPress={() => {
                        navigation.push('HallBookingList');
                    }}
                >
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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});