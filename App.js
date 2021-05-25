import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text} from 'react-native';

// import * as firebase from 'firebase';
import { firebase } from '@firebase/app'
import "firebase/auth";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';

// this hsould be in a env?
// copy and pasted into .env wont work without it here or .env set up
////////////////////

firebase.initializeApp(firebaseConfig);
// if(firebase.apps.length === 0){
//     firebase.initializeApp(firebaseConfig);

// }

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false, 
          loaded: true, 
        })
      }else {
        this.setState({
          loggedIn: true, 
          loaded: true, 
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}> 
          <Text> Loading </Text>
        </View>
      )
    }
    if(!loggedIn) {
      return(      
      <NavigationContainer>
          <Stack.Navigator initalRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
      </NavigationContainer>
    )} else{
        return(
        <View> 
          <Text> user is logged in</Text>
        </View>
      )
    }
   
      

  
  }
}

export default App


