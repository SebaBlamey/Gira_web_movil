import React from "react";
import {Image, View, Text, StyleSheet, TouchableOpacity,Pressable } from "react-native";
import styles from "./components/styles";
import header from "./components/header";
import { useRoute, useNavigation } from "@react-navigation/native";
import button from "./components/button";
import container from "./components/container";

const UserScreen: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
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
    
    <View style={container.style}>
      <Pressable onPress={navigateToEditUser} style={button.style}>
        <Text >Editar informacion del usuario</Text>
      </Pressable>


      <Image
        source={require('wm_front/assets/persona.png')} 
        style={styles.image}
      />
      <Text style={header.style}>Usuario: {userName}</Text>
      
      <Text style={header.subheader}>Correo: {email}{'\n'}</Text>

      <Pressable onPress={navigateToTeamsPage}>
        <Text style={button.style}>Información de equipos</Text>
      </Pressable>
    </View>
  );
  
};

export default UserScreen;