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
import header from "./components/header";
import { container } from "./components/container";
import { smallButton } from "./components/button";
import normalInput from "./components/input";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [allcamps, setAllcamps] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [existingUser, setExistingUser] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

  const isEmailValid = (email: string) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleRegister = async () => {
    if (!email || !username || !password) {
      setAllcamps(false);
      return;
    }
    if (!isEmailValid(email)) {
      setEmailValid(false);
      return;
    }
    if (!isPasswordValid(password)) {
      setPasswordValid(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:3000/users/register", {
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
      if (response.ok) {
        shouldLoad ? setShouldLoad(false) : setShouldLoad(true);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
        setLoading(false);
      } else if (response.status === 409) {
        const errorResponse = await response.json();
        if (errorResponse.message) {
          setExistingUser(true);
        }
      }
    } catch (error) {
      console.error("Error de red", error);
    } finally {
    }
  };

  return (
    <View style={container.style}>
      <Text style={header.style}>Registro</Text>
      <Text style={header.subheader}>Registre su cuenta</Text>
      {emailValid || !email ? null : (
        <Text style={{ color: "red" }}>{"El correo no es valido"}</Text>
      )}
      <TextInput
        style={normalInput.input}
        placeholder="Correo"
        placeholderTextColor="#454052"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailValid(isEmailValid(text));
          setAllcamps(true);
        }}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Usuario"
        placeholderTextColor="#454052"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setAllcamps(true);
        }}
      />
      {passwordValid || !password ? null : (
        <Text style={{ color: "red" }}>{"La contraseña no es valida"}</Text>
      )}
      <TextInput
        style={normalInput.input}
        placeholder="****"
        secureTextEntry
        placeholderTextColor="#454052"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordValid(isPasswordValid(text));
          setAllcamps(true);
        }}
      />
      <Text style={{ color: "red" }}>
        {!allcamps ? "Todos los campos son obligatorios" : ""}
      </Text>
      <Text style={{ color: "red" }}>
        {!existingUser ? "" : "El usuario ya existe"}
      </Text>
      <Pressable
        style={smallButton.style}
        onPress={handleRegister}
        disabled={!loading}
      >
        {!loading  ? (
          <ActivityIndicator size="small" color="#201A30" />
        ) : (
          <Text style={smallButton.text}>{"Registrarse"}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
