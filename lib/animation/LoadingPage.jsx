import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating an API call to fetch the custom JSON file
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Loaded!</Text>
            {/* Render your custom JSON data here */}
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default LoadingPage;
