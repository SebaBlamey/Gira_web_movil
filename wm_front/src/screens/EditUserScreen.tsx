import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./components/styles";
import { useRoute } from "@react-navigation/native";


const EditUserScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params?.userData;
  
    const [newUsername, setNewUsername] = useState(userData.user?.username);
    const [newEmail, setNewEmail] = useState(userData.user?.email);
    const [newPassword, setNewPassword] = useState(userData.user?.pass);

    const saveChanges = () => {
      
        userData.user.username = newUsername;
        userData.user.email = newEmail;
        userData.user.pass = newPassword;
      
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