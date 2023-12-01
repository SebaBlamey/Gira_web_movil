import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import normalInput from "../components/input";
import { smallButton } from "../components/button";


const TasksPage: React.FC = () => {
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectID, setProjectID] = useState("");
    const [userID, setUserID] = useState("");
    const [observation, setObservation] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    interface UserData {
        userData: any;
    }

    const userData = (route.params as UserData)?.userData;

  const handleCreateTask = async () => {
    if (!taskName || !projectID || !status) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createTaskId: userData.user._id,
          nombre: taskName,
          fechaInicio: startDate,
          fechaFin: endDate,
          proyectID: projectID,
          userID: userID,
          observacion: observation,
          estado: status,
        }),
      });
      
      if (response.ok) {
        
        const data = await response.json();
        setLoading(true);
        console.log(data)
        navigation.navigate("UserScreen", {userData}); 
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Crear Tarea
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Nombre de la tarea"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Fecha de inicio (Opcional)"
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Fecha de fin (Opcional)"
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Tarea del Proyecto"
        value={projectID}
        onChangeText={(text) => setProjectID(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Usuario a ingresar (Opcional)"
        value={userID}
        onChangeText={(text) => setUserID(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Observación"
        value={observation}
        onChangeText={(text) => setObservation(text)}
      />
      <TextInput
        style={normalInput.input}
        placeholder="Estado"
        value={status}
        onChangeText={(text) => setStatus(text)}
      />
      <Pressable
        style={smallButton.style}
        onPress={handleCreateTask}
        disabled={loading}
      >
        {!loading ? (
          <Text style={smallButton.text}>Crear Tarea</Text>
        ) : (
          <ActivityIndicator size="small" color="#201A30" />
        )}
      </Pressable>
    </View>
  );
};

export default TasksPage;
