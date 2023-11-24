import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import header from "./components/header";
import button from "./components/button";
import { useNavigation } from "@react-navigation/native";
import { container } from "./components/container";

const StartScreen: React.FC = () => {
  const navigation = useNavigation();
  const handleLoginScreen = () => {
    navigation.navigate("Login");
  };
  const handleRegisterScreen = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={container.style}>
      <Image
        source={require("../../assets/tempLogo.png")}
        style={{
          width: 100,
          height: 100,
          margin: 50,
        }}
      />
      <Text style={header.style}>Bienvenido</Text>
      <Pressable style={button.style} onPress={handleLoginScreen}>
        <Text style={button.text}>{"Iniciar Sesion"}</Text>
      </Pressable>
      <Pressable style={button.style} onPress={handleRegisterScreen}>
        <Text style={button.text}>{"Registrarse"}</Text>
      </Pressable>
    </View>
  );
};

export default StartScreen;
