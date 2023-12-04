import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, View, Text } from "react-native";
import { defaultButton } from "../components/button";

const MyTasks: React.FC = () => {
  interface UserData {
    userData: any;
  }

  const [userTasks, setUserTasks] = useState([]);
  const route = useRoute();
  const navigation = useNavigation(); // Agrega esta línea para obtener el objeto navigation
  const userData = (route.params as UserData)?.userData;
  const idUser = (route.params as UserData)?.userData;
  const navigateToEditTask = (id: string) => {
    navigation.navigate("EditTask", { id });
  };

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        console.log(`buscando al id ${userData.user._id}`)
        const response = await fetch(
          `http://10.0.2.2:3000/tasks/user/${userData.user._id}/tasks`
        );
        if (response.ok) {
          const data = await response.json();
          setUserTasks(data);
          console.log(data)
        } else {
          throw new Error("Error al obtener las tareas del usuario");
        }
      } catch (error) {
        console.error("Error al obtener las tareas del usuario:", error);
      }
    };

    fetchUserTasks();
  }, [userData.user._id]);

  // ... (código anterior)

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
        Tareas del Usuario {userData.user.username}
      </Text>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        {userTasks.map((task) => (
          <View
            key={task._id}
            style={{
              backgroundColor: "#f4f4f4",
              padding: 15,
              borderRadius: 5,
              marginBottom: 15,
              width: "80%",
              maxWidth: 500,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 10, color: "#333" }}>
              {task.nombre}
            </Text>
            <Text style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Estado:</Text> {task.estado}
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
    </View>
  );
};

export default MyTasks;
