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
<<<<<<< HEAD
    
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

=======
    <View style={styles.container}>
      <Pressable onPress={navigateToEditUser} style={styles.button}>
        <Text>Editar informacion del usuario</Text>
      </Pressable>
  
      <Image source={require('wm_front/assets/persona.png')} style={styles.image} />
      <Text style={styles.username}>Usuario: {userName}</Text>
  
      <Text style={styles.email}>Correo: {email}{'\n'}</Text>
  
>>>>>>> 0dbcced167bf6105300fd41850abd2fcf4b98e58
      <Pressable onPress={navigateToTeamsPage}>
        <Text style={button.style}>Información de equipos</Text>
      </Pressable>
<<<<<<< HEAD
    </View>
=======
    </View> // Aquí se cierra la vista correctamente
>>>>>>> 0dbcced167bf6105300fd41850abd2fcf4b98e58
  );
  
};

export default UserScreen;