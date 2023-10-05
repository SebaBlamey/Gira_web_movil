import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from '../src/screens/StartSreen'
import LoginScreen from '../src/screens/LoginScreen'

const Stack = createStackNavigator();

const StackNavigator: React.FC = () =>{
	return (
	<Stack.Navigator initialRouteName="Start"
		screenOptions={{
			headerStyle:{
				backgroundColor: '#183D3D'
			},
			headerTintColor: '#0000'
		}}
		>
		<Stack.Screen name="Start" component={StartScreen} />
		<Stack.Screen name="Login" component={LoginScreen} />
	</Stack.Navigator>
	)
}

export default StackNavigator
