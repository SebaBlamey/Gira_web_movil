import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import normalInput from "./components/input";
import container from "./components/container";
import {header} from "./components/header";
import {smallButton} from "./components/button";
import { Pressable } from "react-native";

const LoginScreen: React.FC = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = async () => {
	if(!username || !password){
		Alert.alert("Error", "Todos los campos son obligatorios");
		return;
	}
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inicio de sesión exitoso", data);
        navigation.navigate("UserScreen",{userData: data});
      } else {
        console.error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  return (
    <View style={container.style}>
      <Text style={header.style}>Iniciar Sesion</Text>
	  <Text style={header.subheader}>Por favor, ingrese para continuar</Text>
      <TextInput
        style={normalInput.input}
        placeholder="Correo"
		placeholderTextColor="#454052"

        value={username}
        onChangeText={(text) => setUsename(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="****"
		placeholderTextColor="#454052"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={smallButton.style} onPress={handleLogin}>
        <Text style={smallButton.text}>{"Iniciar"}</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
