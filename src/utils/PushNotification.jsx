import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    console.log("requestUserPermission");


  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken();
  }
}

async function getToken() {
    console.log("getToken");
  
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmToken:', fcmToken);
    

    try{
        if (!fcmToken) {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
            console.log('Your Firebase Token is:', fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        firebase.firestore().collection('users').doc(fcmToken).set({
            token: fcmToken
        });

    }
    catch(e){
        console.log("FCM error : ",e);
    }
}


export const NotificationListener = () => {

    console.log("NotificationListener");
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        );
    });
    
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
        if (remoteMessage) {
            console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
            );
        }
        });

    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    }
    );

}