import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CollectionNamesPage = () => {
    const [collectionNames, setCollectionNames] = useState([]);

    useEffect(() => {
        const fetchCollectionNames = async () => {
          try {
            const collections = await firestore().getCollections();
            const names = collections.map(collection => collection.id);
            setCollectionNames(names);
          } catch (error) {
            console.error('Error fetching collections:', error);
          }
        };
    
        fetchCollectionNames();
      }, []);

      
    return (
        <View style={style.container}>
            <Text style={style.heading}>Firestore Collections:</Text>
            {collectionNames.map((name) => (
                <Text style={style.text} key={name}>{name}</Text>
            ))}
        </View>
    );
};

export default CollectionNamesPage;


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
});