import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Test1 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore and sort by city
        const fetchData = async () => {
            try {
                const querySnapshot = await firestore()
                    .collection('Checking')
                    .orderBy('city')
                    .get();

                const sortedData = querySnapshot.docs.map((doc) => doc.data());
                setData(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
            {data.map((item) => (
                <Text style={{color:'black',textAlign:'center'}}key={item.id}>{item.city}</Text>
            ))}
        </View>
    );
};

export default Test1;
