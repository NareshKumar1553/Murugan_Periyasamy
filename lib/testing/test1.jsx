import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const MyPage = () => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckbox1Change = () => {
        setIsChecked1(!isChecked1);
    };

    const handleCheckbox2Change = () => {
        setIsChecked2(!isChecked2);
    };

    return (
        <View style={{flex:1,justifyContent:'center',alignContent:'center',backgroundColor:'black'}}>
            <Text>Checkbox 1</Text>
            <CheckBox value={isChecked1} onValueChange={handleCheckbox1Change} />
            <Text>Checkbox 2</Text>
            <CheckBox value={isChecked2} onValueChange={handleCheckbox2Change} />
            
        </View>
    );
};

export default MyPage;
