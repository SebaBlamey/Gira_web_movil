import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import header from "./components/header";
import container from "./components/container";
import button from "./components/button";
import { StackActions, useNavigation } from "@react-navigation/native";
import LoginScreen from '../screens/LoginScreen'
import StackNavigator from "../../navigation/StackNavigator";

const StartScreen: React.FC = () => {
    const navigation = useNavigation();
    const handleLoginScreen = () => {
        navigation.navigate("Login");
    }
  return (
    <View style={container.style}>
      <Text style={header.style}>Bienvenido</Text>
      <Pressable style={button.style} onPress={handleLoginScreen}>
        <Text style={button.text}>{"Iniciar Sesion"}</Text>
      </Pressable>
      <Pressable style={button.style}>
        <Text style={button.text}>{"Registrarse"}</Text>
      </Pressable>
    </View>
  );
};

export default StartScreen;
