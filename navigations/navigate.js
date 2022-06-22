import React from 'react';
import Login from '../screens/Login'
import Signup from '../screens/signup'
import Loading from '../screens/loading'
import ForgotPassword from '../screens/forgotpswrd'
import Home from '../screens/home'
import Company from '../screens/company'
import Services from '../screens/services'
import Request from '../screens/request'
import MyRequest from "../screens/myRequest"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


import {createStackNavigator} from '@react-navigation/stack';
const Stack1 = createStackNavigator()
function CompanyStack(){
  return(
    <Stack1.Navigator  screenOptions={{headerShown:false}}>
        <Stack1.Screen name="home" component={Home}/>
        <Stack1.Screen name="company" component={Company}  options={{headerShown:false}}/>
    <Stack1.Screen name="services" component={Services}  options={{headerShown:false}}/>
        <Stack1.Screen name="request" component={Request} options={{headerShown:false}}/>
</Stack1.Navigator>

  )
}



const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
      headerShown:false,
      tabBarIcon: ({ focused, color, size }) => {
 
        if (route.name === 'home') {
          return <Ionicons name={"home"} size={20} color={color} />;
        } else if (route.name === 'myRequest') {
          return <Entypo name="documents" size={24} color={color} />
        }
      },
      tabBarActiveTintColor: '#17929B',
      tabBarInactiveTintColor: 'gray', 
    })}>
      <Tab.Screen name="home" component={CompanyStack} options={{tabBarLabel:'Home'}}/>
      <Tab.Screen name="myRequest" component={MyRequest} options={{tabBarLabel:'Requests'}} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator()
function MyStack(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="loading" component={Loading}  options={{headerShown:false}}/>

        <Stack.Screen name="signup" component={Signup}  options={{headerShown:false}}/>
    <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
    <Stack.Screen name="forgot" component={ForgotPassword}  options={{headerShown:false}}/>
    <Stack.Screen name="home" component={HomeTabs}/>
    </Stack.Navigator>

  )
}
export default MyStack










