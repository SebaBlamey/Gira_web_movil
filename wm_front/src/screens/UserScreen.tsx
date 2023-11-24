import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import styles from "./components/styles";
import header from "./components/header";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import button, { defaultButton } from "./components/button";
import { container, pretty, prettyContainer } from "./components/container";

import { createDrawerNavigator } from "@react-navigation/drawer";

const UserScreen: React.FC = () => {
  
  const route = useRoute();
  const userData = route.params?.userData;
  const userName = userData.user?.username || "Nombre del Usuario";
  const email = userData.user?.email || "Correo del usuario";
  const navigation = useNavigation();

  const navigateToTeamsPage = () => {
    navigation.navigate("TeamPage", {userData});
  };

  const navigateToEditUser = () => {
    navigation.navigate("EditUser", { userData });
  };

  return (

    <View style={{...prettyContainer.container, flex:1,justifyContent:'flex-start'}}>
      <View style={prettyContainer.headerContainer}>
      <Image
        source={require('../../assets/persona.png')} 
        style={{...styles.image}}
      />
      <Text style={header.style}>Bienvenido {userName}!</Text>
      </View>
      <View style={{flex:1, justifyContent:'center'}}>
      <Pressable onPress={navigateToTeamsPage}>
        <Text style={styles.team}>Información de equipos</Text>
      </Pressable>
      <Pressable
       style={defaultButton.style}
       onPress={navigateToEditUser}>
        <Text style={defaultButton.text}>Editar Perfil</Text>
      </Pressable>
      </View>
    </View>
  );
  
};

export default UserScreen;
