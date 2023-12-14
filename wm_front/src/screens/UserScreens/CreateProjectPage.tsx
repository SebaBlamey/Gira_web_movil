import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "../components/styles";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { prettyContainer } from "../components/container";
import header from "../components/header";
import { defaultButton, smallButton } from "../components/button";
import normalInput from "../components/input";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";

interface Equipo {
  nombre: string;
  _id: string;
}

const CreateProjectPage: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [allTeams, setAllTeams] = useState<Equipo[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Equipo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  const [allcamps, setAllcamps] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [existingProject, setExistingProject] = useState(false);
  const [ProjectAdded, setProjectAdded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
    }, [])
  );

  const handleNewProject = async () => {
    setProjectAdded(false);
    if (!projectName) {
      setAllcamps(false);
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/trabajo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: projectName,
          descripcion: projectDescription,
          equipo: selectedTeam?._id,
        }),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parsea la respuesta como JSON
        console.log(responseData._id)
        setProjectAdded(true);
        
        navigation.navigate("ProyectPage", {userData});
      } else {
        console.log("Error al crear el proyecto");
      }
    } catch (error) {
      console.error("Error al crear el proyecto", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const response = await fetch("http://localhost:3000/equipo/findAll");
        if (response.ok) {
          const allTeamsData = await response.json();
          setAllTeams(allTeamsData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error al obtener la lista de equipos", error);
      }
    };
    fetchAllTeams();
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <View
        style={{
          ...prettyContainer.container,
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <View style={prettyContainer.headerContainer}>
          <Image
            source={require("../../../assets/proyecto-logo.png")}
            style={{ ...styles.image }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={header.style}>Crear Proyecto</Text>
          <Text style={header.subheader}>Cree un proyecto</Text>
          {projectName == null ? (
            <Text style={{ color: "red" }}>El equipo no es valido</Text>
          ) : null}
          <TextInput
            style={{ ...normalInput.input, width: 200 }}
            placeholder="Nombre del proyecto"
            placeholderTextColor={"#454052"}
            value={projectName}
            onChangeText={(text) => {
              setProjectName(text);
              setAllcamps(true);
            }}
          />
          <TextInput
            style={{
              ...normalInput.descInput,
              width: 300,
              height: 120,
              textAlignVertical: "top",
            }}
            multiline={true}
            placeholder="Descripcion del proyecto"
            placeholderTextColor={"#454052"}
            value={projectDescription}
            onChangeText={(text) => {
              setProjectDescription(text);
              setAllcamps(true);
            }}
          />
          <SelectList
            boxStyles={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0DF5E3",
              maxWidth: 300,
              width: 300,
              alignSelf: "center",
              marginTop: "5%",
            }}
            placeholder="Asignar equipo"
            notFoundText="No hay equipos disponibles"
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
            searchicon={
              <FontAwesome name="search" size={20} color={"#0DF5E3"} />
            }
            search={false}
            inputStyles={{ color: "white", fontSize: 16, marginLeft: 10 }}
            setSelected={(team) => setSelectedTeam(team)}
            data={allTeams.map((team) => ({
              key: team._id,
              value: `${team.nombre}`,
            }))}
            save="key"
          />
          <Pressable
            style={{ ...smallButton.style, marginTop: 10, alignContent: "center" }}
            onPress={handleNewProject}
            disabled={!loading}
          >
            {!loading ? (
              <ActivityIndicator size="small" color="#201A30" />
            ) : (
              <Text style={smallButton.text}>{"Agregar"}</Text>
            )}
          </Pressable>
          {ProjectAdded ? (
            <Text style={{ color: "green" }}>
              {"Proyecto creado exitosamente"}
            </Text>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateProjectPage;
