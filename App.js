import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, Text, LogBox, AsyncStorage } from 'react-native';
import AuthContext from './components/context';
import Users from './models/Users';
import sendPushNotification from './models/sendPushNotifications';
import registerForPushNotificationsAsync from './models/registerForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';

LogBox.ignoreLogs(['Remote debugger']);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const Stack = createStackNavigator();
const MyStack = () => {

  /*const [isLoading, setIsLoading ] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);*/
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (username, password, userToken) => {
      try{
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e){
      }
      dispatch({ type: 'LOGIN', id: 'user', token: userToken})
    },
    signOut: async () => {
      try{
        await AsyncStorage.removeItem('userToken');
      } catch(e){
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: async (username, password, fullname, email, image) => {
      const userToken = "testToken"
      user = {
        id: Users.length+1,
        fullname: fullname,
        email: email,
        username: username, 
        password: password, 
        userToken: userToken,
        image: image
      }
      Users.push(user);
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e){
      }
      dispatch({ type: 'REGISTER', id: 'user', token: userToken})
    },
    getUsername: () => {
      const res = null;
      for(var i = 0; i<Users.length; i++)
      {
        if(Users[i]['userToken'] == loginState.userToken)
          return Users[i];
      }
      return {};
    },
    changeFullname: (fullname) => {
      for(var i = 0; i < Users.length; i++)
      {
        if(Users[i]['userToken'] == loginState.userToken)
        {
          Users[i]['fullname'] = fullname;
          
          return Users[i];
        }
      }
      return {};
    },
    changeUsername: (username) => {
      for(var i = 0; i < Users.length; i++)
      {
        if(Users[i]['userToken'] == loginState.userToken)
        {
          Users[i]['username'] = username;
          
          return Users[i];
        }
      }
      return {};
    },
    changeEmail: (email) => {
      for(var i = 0; i < Users.length; i++)
      {
        if(Users[i]['userToken'] == loginState.userToken)
        {
          Users[i]['email'] = email;
          
          return Users[i];
        }
      }
      return {};
    },
    sendPushNotification: async(messageTitle, messageBody) => {
      await sendPushNotification(expoPushToken, messageTitle, messageBody);
    }
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e){
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000);
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if(loginState.isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
    { loginState.userToken ? 
    <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
    :
    <Stack.Navigator>
      <Stack.Screen 
        name="Sign In" 
        component={LoginScreen}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#009387',
            elevation: 0
          }
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#009387',
            elevation: 0,
          },
          headerTintColor: '#fff' 
        }}
      />
    </Stack.Navigator>
    }
    </AuthContext.Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

