import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MyPage = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pangaliParentSnapshot = await firestore()
                    .collection('Checking')
                    .get();

                pangaliParentSnapshot.forEach(async (doc) => {
                    const data = doc.data();
                    // Add the data to the newCollection with an additional field and custom document name
                    console.log(data.name);
                    await firestore().collection('Testing').doc(data.name).set({
                        ...data,
                        tax: 0
                    });
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View>
            <Text style={{ color: 'black' }}>Data Fetching and Adding Example</Text>
            <Text>Data is being fetched from "PangaliParent" collection and added to "newCollection" with an additional field and custom document name.</Text>
        </View>
    );
};

export default MyPage;
