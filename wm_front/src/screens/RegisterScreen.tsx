import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import header from "./components/header";
import container from "./components/container";
import {button, smallButton} from "./components/button";
import normalInput from "./components/input";
import { Pressable } from "react-native";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if(!email || !username || !password){
        Alert.alert("Error", "Todos los campos son obligatorios");
        return;
    }
    try{
        const response = await fetch("http://127.0.0.1:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            }),
        });
        if(response.ok){
            const data = await response.json();
            Alert.alert("Registro exitoso", "Usuario registrado correctamente");
            console.log("Registro exitoso", data);
        } else {
            console.error("Error al registrar");
        }
    } catch (error){
        console.error("Error de red", error);
    }
  };

  return (
    <View style={container.style}>
      <Text style={header.style}>Registro</Text>
      <Text style={header.subheader}>Registre su cuenta</Text>
      <TextInput
        style={normalInput.input}
        placeholder="Correo"
		    placeholderTextColor="#454052"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Usuario"
		    placeholderTextColor="#454052"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="****"
        secureTextEntry
		    placeholderTextColor="#454052"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={smallButton.style} onPress={handleRegister}>
        <Text style={smallButton.text}>{"Registrarse"}</Text>
      </Pressable>
    </View>
  );
};
export default RegisterScreen;
