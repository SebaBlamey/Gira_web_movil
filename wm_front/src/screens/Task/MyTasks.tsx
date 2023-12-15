import React, { useEffect, useState } from "react";
import { Pressable, View, Image, Text, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { defaultButton } from "../components/button";
import { prettyContainer } from "../components/container";
import styles from "../components/styles";
import normalInput from "../components/input";

const MyTasks: React.FC = () => {
  interface UserData {
    userData: any;
  }

  const [filter, setFilter] = useState('');
  const [userTasks, setUserTasks] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const userData = (route.params as UserData)?.userData;

  const navigateToEditTask = (id: string) => {
    navigation.navigate("EditTask", { id, userData, updateCallback: fetchUserTasks });
  };

  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'completo':
        return 'green';
      case 'pendiente':
        return 'orange';
      case 'en proceso':
        return 'blue';
      case 'cerrado':
        return 'red';
      default:
        return 'black';
    }
  };

  const fetchUserTasks = async () => {
    try {
      console.log(`buscando al id ${userData.user._id}`);
      const response = await fetch(`http://10.0.2.2:3000/tasks/user/${userData.user._id}/tasks`);
      if (response.ok) {
        const data = await response.json();
        setUserTasks(data);
        console.log(data);
      } else {
        throw new Error("Error al obtener las tareas del usuario");
      }
    } catch (error) {
      console.error("Error al obtener las tareas del usuario:", error);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, [userData.user._id]);

  const filteredTasks = filter.trim() === '' 
    ? userTasks.filter(task => task.estado.toLowerCase() !== 'cerrado')
    : userTasks.filter(task => 
        task.nombre.toLowerCase().includes(filter.toLowerCase()) && 
        task.estado.toLowerCase() !== 'cerrado'
      );

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ ...prettyContainer.container, flex: 1, justifyContent: 'flex-start' }}>
          <View style={prettyContainer.headerContainer}>
            <Image source={require("../../../assets/task-logo.png")} style={{ ...styles.image }} />
          </View>
          <Text style={{ fontSize: 20, color: "#fff", marginTop: "10%" }}>Tus tareas:</Text>
          {userTasks.length === 0 && (
            <Text style={{ fontSize: 15, color: "#fff", marginTop: "10%" }}>
              No tienes tareas asignadas
            </Text>
          )}
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Buscar"
            placeholderTextColor={"#294D61"}
            value={filter}
            onChangeText={(text) => {
              setFilter(text);
            }}
          />
          {filteredTasks.map((task) => (
            <View
              key={task._id}
              style={{
                alignContent: "flex-start",
                marginTop: "5%",
                width: "90%",
                borderWidth: 1,
                borderColor: "#0F989C",
                backgroundColor: "#072E33",
                borderRadius: 10,
                alignSelf: "center",
                padding: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                {task.nombre}
              </Text>
              <Text style={{ marginBottom: 5 }}>
                <Text style={{ fontWeight: "bold", color: 'white' }}>Estado: </Text>
                <Text style={{ fontWeight: 'bold', color: getEstadoColor(task.estado) }}>{task.estado}</Text>
              </Text>
              <Pressable
                onPress={() => navigateToEditTask(task._id)}
                style={defaultButton.style}
              >
                <Text>Editar Tarea</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyTasks;
