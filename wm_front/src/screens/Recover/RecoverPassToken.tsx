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
import normalInput from "../components/input";
import container from "../components/container";
import { header } from "../components/header";
import { smallButton } from "../components/button";
import { Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const RecoverPassToken: React.FC = () => {
  const [password1, setPassword1] = useState("");
  const [passwordValid1, setPasswordValid1] = useState(true);
  const [password2, setPassword2] = useState("");
  const [passwordValid2, setPasswordValid2] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [allcamps, setAllcamps] = useState(true);
  const [clave, setClave] = useState("");
  const [claveValid, setClaveValid] = useState(true);
  const route = useRoute();
  const userData = route.params?.userData;
  const key = userData.user?.recoveryCode;
  const [requesting, setRequesting] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

  const isPasswordValid = (password: string) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };
  const isClaveValid = (clave: string) => {
    const clavePattern = /^[A-Z0-9]{6}$/;
    return clavePattern.test(clave);
  };
  const isEquals = (password1: string, password2: string) => {
    return password1 == password2;
  };

  const handleRecovers = async () => {
    if (requesting) {
      return;
    }
    if (!clave || !password1 || !password2) {
      setAllcamps(false);
      return;
    }
    if (!isPasswordValid(password1)) {
      setPasswordValid1(false);
      return;
    }
    if (!isPasswordValid(password2)) {
      setPasswordValid2(false);
      return;
    }
    if (!isClaveValid(clave)) {
      setClaveValid(false);
      return;
    }

    const currentTime = new Date();
    if (key != clave) {
      Alert.alert("La clave no coincide");
      return;
    } else if (
      userData.user.recoveryCodeExpiration &&
      currentTime > userData.user.recoveryCodeExpiration
    ) {
      Alert.alert("La clave de recuperación ha caducado.");
      return;
    }
    const requestData = {
      email: userData.user._id,
      newPassword: password1,
    };
    setRequesting(true);
    try {
      const response = await fetch(`http://localhost:3000/users/changePass/${userData.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        console.log("Contraseña cambiada exitosamente");
      } else {
        console.error(
          `Hubo un error al cambiar la contraseña, ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <View style={container.style}>
      <Text style={header.style}>Recuperar contrasena</Text>
      <Text style={header.subheader}>Ingrese la clave de recuperacion</Text>
      <Text style={{ color: "red" }}>
        {claveValid ? "" : "Clave no valida"}
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Clave de recuperacion"
        placeholderTextColor="#454052"
        onChangeText={(text) => {
          const upperCaseText = text.toUpperCase();
          setClave(upperCaseText);
          setClaveValid(true);
          setAllcamps(true);
        }}
      />
      <Text style={{ color: "red" }}>
        {passwordValid1 ? "" : "Contrasena no valida"}
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Nueva contrasena"
        placeholderTextColor="#454052"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword1(text);
          setPasswordValid1(true);
          setAllcamps(true);
        }}
      />
      <Text style={{ color: "red" }}>
        {isEquals(password1, password2) ? "" : "Contrasena no valida"}
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Nueva contrasena nuevamente"
        placeholderTextColor="#454052"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword2(text);
          setPasswordValid2(true);
          setAllcamps(true);
        }}
      />
      <Text style={{ color: "red" }}>
        {!allcamps ? "Todos los campos son obligatorios" : ""}
      </Text>
      <Pressable
        style={smallButton.style}
        onPress={handleRecovers}
        disabled={!loading}
      >
        {!loading ? (
          <ActivityIndicator size="small" color="#201A30" />
        ) : (
          <Text style={smallButton.text}>{"Iniciar"}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default RecoverPassToken;
