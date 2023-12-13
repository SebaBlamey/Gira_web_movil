import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../components/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import normalInput from "../components/input";
import { smallButton } from "../components/button";
import { prettyContainer } from "../components/container";
import header from "../components/header";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";


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
  const estados = ['PENDIENTE', 'EN PROCESO', 'COMPLETADO', 'CERRADO']
  const [selectedStatus, setSelectedStatus] = useState<string>("PENDIENTE");
  {/*estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO' | 'CERRADO';
 */}

  useEffect(() => {
    setStatus(selectedStatus);
  }
  , [selectedStatus]);

  const userData = (route.params as UserData)?.userData;

  const handleCreateTask = async () => {
    if (!taskName || !projectID || !status) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:3000/tasks/create", {
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
        console.log(data);
        navigation.navigate("UserScreen", { userData });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
    <View style={{...prettyContainer.container, flex:1}}>
      <View style={{...prettyContainer.headerContainer}}>
        <Image
          source={require("../../../assets/task-logo.png")}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={header.style}>Crear Tarea</Text>
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Nombre de la tarea"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Fecha de inicio (Opcional)"
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
          />
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Fecha de fin (Opcional)"
            value={endDate}
            onChangeText={(text) => setEndDate(text)}
          />
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Tarea del Proyecto"
            value={projectID}
            onChangeText={(text) => setProjectID(text)}
          />
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Usuario a ingresar (Opcional)"
            value={userID}
            onChangeText={(text) => setUserID(text)}
          />
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Observación"
            value={observation}
            onChangeText={(text) => setObservation(text)}
          />
          <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
          Seleccionar estado:
          </Text>
          <SelectList
            placeholder="Estado"
            searchPlaceholderTextColor={"white"}
            search={false}
            boxStyles={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0DF5E3",
              width: 300,
              alignSelf: "center",
              marginTop: "2%",
            }}
            dropdownStyles={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0DF5E3",
              maxWidth: 300,
              width: 300,
              alignSelf: "center",
            }}
            arrowicon={
              <FontAwesome name="chevron-down" size={20} color={"#0DF5E3"} />
            }
            dropdownTextStyles={{ color: "white", fontSize: 16 }}
            closeicon={<FontAwesome name="user" size={20} color={"#0DF5E3"} />}
            searchicon={<FontAwesome name="search" size={20} color={"#0DF5E3"} />}
            dropdownTextStyles={{ color: "white", fontSize: 16 }}
            setSelected={(status) => setSelectedStatus(status)}
            inputStyles={{ color: "white", fontSize: 16, marginLeft: 10 }}
            data={estados.map((status) => ({
              key: status,
              value: status,
            }))}
            save="key"
          />
          <Pressable
            style={{ ...smallButton.style, marginTop: 10 , alignContent: "center"}}
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
      </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TasksPage;
