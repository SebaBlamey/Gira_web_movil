import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  ScrollView,
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
  const [ProjectAdded, setProjectAdded] = useState(false);
  const [existingProject, setExistingProject] = useState(false);

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
          creador: userData.user._id,
          equipos: [
            {
              Equipo: selectedTeam,
            },
          ],
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setProjectAdded(true);
        shouldLoad ? setShouldLoad(false) : setShouldLoad(true);
        setTimeout(() => {
          navigation.navigate("ProyectPage", { userData });
        }, 2000);
        setLoading(false);
      } else if (response.status == 409) {
        const errorResponse = await response.json();
        if (errorResponse.message) {
          setExistingProject(true);
        }
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
          console.log("Error al obtener la lista de equipos. Código de estado:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud para obtener la lista de equipos", error);
      }
    };
  
    fetchAllTeams();
  }, []);
  
  

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#05161A" }}>
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
              placeholderTextColor={"#294D61"}
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
              placeholderTextColor={"#294D61"}
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
              closeicon={
                <FontAwesome name="user" size={20} color={"#0DF5E3"} />
              }
              searchicon={
                <FontAwesome name="search" size={20} color={"#0DF5E3"} />
              }
              search={false}
              inputStyles={{ coalor: "white", fontSize: 16, marginLeft: 10 }}
              setSelected={(team) => setSelectedTeam(team)}
              data={allTeams.map((team) => ({
                key: `${team._id}`,
                value: `${team.nombre}`,
              }))}
              save="value"
            />

            <Text style={{ color: "red" }}>
              {existingProject ? "El Proyecto ya existe" : null}
              {!allcamps ? "Todos los campos son obligatorios" : null}
            </Text>
            <Pressable
              style={{
                ...smallButton.style,
                marginTop: 10,
                alignContent: "center",
              }}
              onPress={handleNewProject}
              disabled={!loading}
            >
              {(!loading && !existingProject)  ? (
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProjectPage;
