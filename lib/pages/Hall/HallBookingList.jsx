import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const HallBookingList = () => {
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingList = async () => {
            try {
                const snapshot = await firestore().collection('HallBooking').get();
                const bookings = snapshot.docs.map((doc) => doc.data());
                setBookingList(bookings);
            } catch (error) {
                console.error('Error fetching booking list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingList();
    }, []);

    const renderBookingItem = ({ item }) => (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>
            <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />
            <View style={styles.ItemList}>
                <Text style={styles.Item}>Date : {item.selectedDate}</Text>
                <Text style={styles.Item}>Name : {item.name}</Text>
                <Text style={styles.Item}>Phone Number : {item.phoneNumber}</Text>
                <Text style={styles.Item}>Email : {item.email}</Text>
                <Text style={styles.Item}>City : {item.city}</Text>
                <Text style={styles.Item}>Amount : {item.amount}</Text>
                <Text style={styles.Item}>Function Name : {item.functionName}</Text>
            </View>
        </LinearGradient>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        
        <View style={styles.Container}>
            <Text style={styles.heading}>Hall Booking List</Text>
            <FlatList
                data={bookingList}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.id}
                style={{ padding: 10 }}
            />
        </View>
    );
};

export default HallBookingList;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10
    },
    ItemList: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    Item: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
});