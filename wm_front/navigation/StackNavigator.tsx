import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../src/LoginScreen'

const Stack = createStackNavigator();

const StackNavigator: React.FC = () =>{
	return (
	<Stack.Navigator initialRouteName="Login">
		<Stack.Screen name="Login" component={LoginScreen} />
	</Stack.Navigator>
	)
}

export default StackNavigator
