import LottieView from "lottie-react-native";
import React from "react";
import { View, Text, StyleSheet, Button, Dimensions, StatusBar } from "react-native";

export default function LoadingAnime() {
    return(
        <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'while'}}>
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#f9f5fa" translucent={true} />
          <LottieView
              source={require('../assets/LoadingBall.json')}
              style={sty.animation}
              autoPlay
              />
        </View>
    );
}
const sty = StyleSheet.create({
  animation:{
    width:200,
    height:150
  }
})