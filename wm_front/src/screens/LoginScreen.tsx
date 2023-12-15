import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import normalInput from "./components/input";
import { header } from "./components/header";
import { smallButton } from "./components/button";
import { Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { container } from "./components/container";

const LoginScreen: React.FC = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [forgotPasswordResponse, setForgotPasswordResponse] = useState("");
  const [allcamps, setAllcamps] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [existingUser, setExistingUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );
  const isEmailValid = (email: string) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };
  const handleForgotPass = async () => {
    try {
      navigation.navigate("RecoverPass");
      console.log("Forgot pass");
    }
    catch (error) {
      console.error("Error");
    }
  };
  const handleLogin = async () => {
    if (!username || !password) {
      setAllcamps(false);
      return;
    }
    if (!isEmailValid(username)) {
      setEmailValid(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://10.0.2.2:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,  
          password: password,
        }),
      });
      if(response){
        setLoading(false);
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
          navigation.navigate("UserScreen", { userData: data });
        }, 2000);
      } else if (response.status == 409) {
        const errorResponse = await response.json();
        if (errorResponse.message) {
          setExistingUser(true);
        }
      }
    
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  return (
    <View style={container.style}>
      <Text style={header.style}>Iniciar Sesion</Text>
      <Text style={header.subheader}>Por favor, ingrese para continuar</Text>
      {emailValid || !username ? null : (
        <Text style={{ color: "red" }}>{"El correo no es valido"}</Text>
      )}
      <TextInput
        style={normalInput.input}
        placeholder="Correo"
        placeholderTextColor="#454052"
        value={username}
        onChangeText={(text) => {
          setUsename(text);
          setEmailValid(isEmailValid(text));
          setAllcamps(true);
        }}
      />
      <TextInput
        style={normalInput.input}
        placeholder="****"
        placeholderTextColor="#454052"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setAllcamps(true);
        }}
      />
      <Text style={{ color: "red" }}>
        {!allcamps ? "Todos los campos son obligatorios" : ""}
      </Text>
      <Text style={{ color: "red" }}>
        {!existingUser ? "" : "El correo o la contrasena son incorrectos."}
      </Text>
      <Pressable
        style={smallButton.style}
        onPress={handleLogin}
        disabled={!loading}
      >
        {!loading ? (
          <ActivityIndicator size="small" color="#201A30" />
        ) : (
          <Text style={smallButton.text}>{"Iniciar"}</Text>
        )}
      </Pressable>
      <Pressable
        style={styles.forgotPasswordButton}
        onPress={handleForgotPass}
        disabled={!loading}
      >
        <Text style={styles.forgotPasswordText}>Olvide mi contrasena</Text>
      </Pressable>
      {forgotPasswordResponse ? (
        <Text style={styles.forgotPasswordResponse}>
          {forgotPasswordResponse}
        </Text>
      ) : null}
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
