import React from "react";
import {Image, View, Text, StyleSheet, TouchableOpacity,Pressable } from "react-native";
import styles from "./components/styles";
import header from "./components/header";
import { useRoute, useNavigation } from "@react-navigation/native";

const UserScreen: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
<<<<<<< HEAD
  const userName = userData.user?.username || "Nombre del Usuario";
  const email = userData.user?.email || "Correo del usuario";
  const navigation = useNavigation();

  const navigateToTeamsPage = () => {
    navigation.navigate("TeamPage");
  };

  const navigateToEditUser = () => {
    navigation.navigate("EditUser", { userData });
  }

  return (
    
    <View style={styles.container}>
      <Pressable onPress={navigateToEditUser} style={styles.button}>
        <Text >Editar informacion del usuario</Text>
      </Pressable>


      <Image
        source={require('wm_front/assets/persona.png')} 
        style={styles.image}
      />
      <Text style={styles.username}>Usuario: {userName}</Text>
      
      <Text style={styles.email}>Correo: {email}{'\n'}</Text>

      <Pressable onPress={navigateToTeamsPage}>
        <Text style={styles.team}>Información de equipos</Text>
      </Pressable>
=======
  const userName = userData.user.username || "Nombre del Usuario";
  const pass = userData.user?.password || "Contraseña";

  return (
    <View style={container.style}>
        <Text style={header.style}>{userName}</Text>
        <Text style={header.style}>{pass}</Text>
>>>>>>> dbc9111889dea150e71b9401904cd7969f890a51
    </View>
  );
};

export default UserScreen;