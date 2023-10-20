import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./components/styles";
import { useRoute } from "@react-navigation/native";
import container from "./components/container";
import header from "./components/header";
import { smallButton } from "./components/button";
import normalInput from "./components/input";

const EditUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  const [newUsername, setNewUsername] = useState(userData.user?.username);
  const [newEmail, setNewEmail] = useState(userData.user?.email);
  const [newPassword, setNewPassword] = useState(userData.user?.pass);

  const saveChanges = async () => {
    const requestData = {
      newUsername: userData.user.username,
      newEmail: userData.user.email,
      newPassword: userData.user.password,
    };

    try {
      const response = await fetch(
        `http://10.0.2.2:3000/users/updateUser/${userData.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestData }),
        }
      );
      if (response.ok) {
        console.log("Sí se pudo");
      } else {
        console.log("No se pudo");
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error");
    }
    navigation.navigate("UserScreen", { userData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nuevo Nombre de Usuario:</Text>
      <TextInput
        style={styles.input}
        value={newUsername}
        onChangeText={(text) => setNewUsername(text)}
      />

      <Text style={styles.label}>Nuevo Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
      />

      <Text style={styles.label}>Nueva Contraseña:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserScreen;
