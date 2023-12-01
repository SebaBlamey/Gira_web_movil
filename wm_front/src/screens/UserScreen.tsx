import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styles from "./components/styles";
import header from "./components/header";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import button, { defaultButton } from "./components/button";
import { container, prettyContainer } from "./components/container";

import { createDrawerNavigator } from "@react-navigation/drawer";

const UserScreen: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
  const userName = userData.user?.username || "Nombre del Usuario";
  const email = userData.user?.email || "Correo del usuario";
  const navigation = useNavigation();

  const navigateToTeamsPage = () => {
    navigation.navigate("TeamPage", { userData });
  };

  const navigateToEditUser = () => {
    navigation.navigate("EditUser", { userData });
  };
  const navigateToProyectos = () => {
    navigation.navigate("ProyectPage", { userData });
  };
  const navigateToTasksPage = () => {
    navigation.navigate("TasksPage", { userData });
  };
  const navigateToMyTasks = () => {
    navigation.navigate("MyTasks", { userData });
  };

  const date = new Date();
  // quiero que la fecha se vea como Martes 20 de Julio
  const formattedDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <View
      style={{
        ...prettyContainer.container,
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <View style={prettyContainer.headerContainer}>
        <Image
          source={require("../../assets/persona.png")}
          style={{ ...styles.image }}
        />
        <Text style={{ ...header.style, color: "#201A30", fontWeight: "bold" }}>
          Bienvenido {userName}!
        </Text>
      </View>
      <Text style={{ color: "#fff", fontSize: 15 }}>{formattedDate}</Text>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Pressable onPress={navigateToProyectos} style={defaultButton.style}>
          <Text style={defaultButton.text}>Proyectos</Text>
        </Pressable>
        <Pressable onPress={navigateToTeamsPage} style={defaultButton.style}>
          <Text style={defaultButton.text}>Equipos</Text>
        </Pressable>
        <Pressable onPress={navigateToTasksPage} style={defaultButton.style}>
          <Text style={defaultButton.text}>Crear Tareas</Text>
        </Pressable>
        <Pressable onPress={navigateToTasksPage} style={defaultButton.style}>
          <Text style={defaultButton.text}>Ver Mis Tareas</Text>
        </Pressable>
        <Pressable style={defaultButton.style} onPress={navigateToMyTasks}>
          <Text style={defaultButton.text}>Editar perfil</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserScreen;
