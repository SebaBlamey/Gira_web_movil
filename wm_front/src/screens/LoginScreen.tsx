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
  const [forgotPasswordResponse, setForgotPasswordResponse] = useState("");
  const handleForgotPass = async () => {
  	if(!username){
		Alert.alert("Error","Ingrese su correo")
		return;
	}
	try{
		const response = await fetch('http://127.0.0.1:3000/auth/getPassword',{
			method: "POST",
			headers: {
				"Content-Type":"application/json",
			},
			body: JSON.stringify({
				email:username
			}),
		});
		if(response.ok){
			Alert.alert(response.toString())
		}
	}
	catch( error){
		console.error("Error")
	}
  };
  const handleLogin = async () => {
	if(!username || !password){
		Alert.alert("Error", "Todos los campos son obligatorios");
		return;
	}
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
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
	<Pressable style = {styles.forgotPasswordButton} onPress={handleForgotPass}>
		<Text style={styles.forgotPasswordText}>Olvide mi contrasena</Text>
	</Pressable>
	{forgotPasswordResponse ? (
		<Text style={styles.forgotPasswordResponse}>{forgotPasswordResponse}</Text>
	): null}	
    </View>
  );
};
const styles = StyleSheet.create({
  forgotPasswordButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: "#0DF5E3",
    textDecorationLine: "underline",
  },
  forgotPasswordResponse: {
    marginTop: 10,
    alignSelf: "center",
  },
});

export default LoginScreen;
