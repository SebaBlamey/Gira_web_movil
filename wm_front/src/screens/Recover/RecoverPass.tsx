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

const RecoverPass: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allcamps, setAllcamps] = useState(true);
  const [existingUser, setExistingUser] = useState(false);
  const [requesting, setRequesting] = useState(false);

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
    if(requesting){
      return
    }
    if (!email) {
      setAllcamps(false);
      return;
    }
    if (!isEmailValid(email)) {
      setEmailValid(false);
      return;
    }
    setRequesting(true);
    try {
      const response = await fetch("http://localhost::3000/users/recoverPass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
          navigation.navigate("RecoverPassToken", { userData: data });
        }, 2000);
        setLoading(false);
      } else if (response.status === 409) {
        setExistingUser(true);
      }
    } catch (error) {
      console.error("Error");
    }
    finally {
      setRequesting(false);
    }
  };

  return (
    <View style={container.style}>
      <Text style={header.style}>Recuperar contrasena</Text>
      <Text style={header.subheader}>
        Ingrese su correo para recuperar su contrasena
      </Text>
      {emailValid || !email ? null : (
        <Text style={{ color: "red" }}>{"El correo no es valido"}</Text>
      )}
      <Text style={{ color: "red" }}>
        {!existingUser ? ""  : "El usuariuo no existe"}
        </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Correo"
        placeholderTextColor="#454052"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailValid(true);
          setAllcamps(true);
            setExistingUser(false);
        }}
      />
      <Text style={{ color: "red" }}>
        {allcamps ? null : "Todos los campos son obligatorios"}
      </Text>
      <Pressable style={smallButton.style} onPress={handleForgotPass}
      disabled={!loading}>
        {!loading ? (
          <ActivityIndicator size="small" color="#201A30" />
        ) : (
          <Text style={smallButton.text}>{"Recuperar"}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default RecoverPass;
