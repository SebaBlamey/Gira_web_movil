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
import {Image} from 'react-native'

const EditUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  const [newUsername, setNewUsername] = useState(userData.user?.username);
  const [newEmail, setNewEmail] = useState(userData.user?.email);
  const [newPassword, setNewPassword] = useState(userData.user?.pass);

  const saveChanges = async () => {

    const requestData = {
      
      newUsername,
    };

    try {
      const response = await fetch(
        
        `http://localhost:3000/users/${userData.user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestData }),
        }
      );
      console.log(userData.user._id);
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
        <Image
          source={require('../../assets/persona.png')} 
          style={styles.image}
        />
      <Text style={styles.label2}>Nuevo Nombre de Usuario:</Text>
      <TextInput
        style={styles.input}
        value={newUsername}
        onChangeText={(text) => setNewUsername(text)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserScreen;
