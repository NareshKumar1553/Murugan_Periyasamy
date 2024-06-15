import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HallBookingList = () => {
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingList = async () => {
            const snapshot = await firestore().collection('EventDates').get();
            const bookings = snapshot.docs.map((doc) => doc.data());
            setBookingList(bookings);
            setLoading(false);
        };

        fetchBookingList();
    }, []);

    const renderBookingItem = ({ item }) => (
        <View style={styles.ItemList}>
            <Text style={styles.Item}>Date : {item.date}</Text>
            <Text style={styles.Item}>Name : {item.name}</Text>
            <Text style={styles.Item}>PhNo : {item.phoneNumber}</Text>
        </View>
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
        backgroundColor: 'pink',
        justifyContent:'center',
        paddingTop: 30
        
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
        color:'black'
    },

});