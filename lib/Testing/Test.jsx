import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddLocationPage = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');



    const addLocation = async () => {
        try {
            const collectionRef = firestore().collection('PangaliParent');
            const snapshot = await collectionRef.get();

            snapshot.forEach(async (doc) => {
                const docRef = collectionRef.doc(doc.id);
                await docRef.update({
                    location: new firestore.GeoPoint(11.417115934193228, 78.2231769049313),
                });
            });

            console.log('Extra field added to all documents successfully!');
        } catch (error) {
            console.error('Error adding extra field to documents:', error);
        }
    };

    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <Button title="Add Location" onPress={addLocation} />
        </View>
    );
};

export default AddLocationPage;


//location: new firestore.GeoPoint(11.417115934193228, 78.2231769049313),