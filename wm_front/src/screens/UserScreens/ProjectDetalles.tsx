import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import styles from "../components/styles";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { prettyContainer } from "../components/container";
import { smallButton } from "../components/button";
import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Equipo {
  nombre: string;
  _id: string;
}

const ProjectDetalles: React.FC = () => {
  const route = useRoute();
  const projectData = route.params?.proyecto;
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [allTeams, setAllTeams] = useState<Equipo[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Equipo | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [existingProject, setExistingProject] = useState(false);
  const [ProjectAdded, setProjectAdded] = useState(false);
  const [teamAdded, setTeamAdded] = useState(false);

  useEffect(() => {
  setExistingProject(false);
}, [selectedTeam]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );


  const handleNewProject = async () => {
    setProjectAdded(false);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/trabajo/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _idTrabajo: projectData._id,
          _idEquipo: selectedTeam,
        }),
      });
      if (response.ok) {
        setTeamAdded(true);
        setLoading(false);
        console.log("ok");
      } else if (response.status === 409) {
        setExistingProject(true);
        console.log("error");
      }
    } catch (error) {
      console.error("Error al crear el proyecto", error);
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsData = await Promise.all(
        projectData.equipos.map(async (team) => {
          const response = await fetch(
            `http://localhost:3000/equipo/findById/${team.Equipo}`,
          );
          if (!response.ok) {
            console.log(`error al buscar ${team.Equipo}\n${response.status}`);
          } else {
            try {
              const responseText = await response.text();
  
              if (responseText.trim() !== "") {
                const teamData = JSON.parse(responseText);
                console.log(`se encontro al equipo ${team.Equipo}`);
                return teamData;
              } else {
                console.log(`La respuesta para ${team.Equipo} está vacía.`);
              }
            } catch (error) {
              console.error("Error al analizar la respuesta JSON", error);
            }
          }
        })
      );
      if (teamsData != null) {
        setEquipos(teamsData);
        console.log(teamsData);
      }
    };    
    fetchTeams();
  }, [projectData._id]);
  

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

  const teamName = projectData?.nombre || "Nombre del proyecto";
  const descripcion = projectData?.descripcion || "Sin descripción";

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
          <Text style={{ ...prettyContainer.header, fontWeight: "bold" }}>
            {teamName.toString().toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            alignContent: "flex-start",
            marginTop: "10%",
            width: "80%",
            borderWidth: 1,
            borderColor: "#0DF5E3",
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Descripción:
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>{descripcion}</Text>
        </View>
        <View
          style={{
            alignContent: "flex-start",
            marginTop: "5%",
            width: "80%",
            borderWidth: 1,
            borderColor: "#0DF5E3",
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
  Equipos:
</Text>
{equipos.length === 0 ? (
  <Text style={{ color: "white", fontSize: 16 }}>
    No hay equipos asignados
  </Text>
) : (
  equipos.map((equipo, index) => (
    <Text key={index} style={{ color: "white", fontSize: 16 }}>
      {equipo && equipo.nombre ? equipo.nombre : ''}
    </Text>
  ))
)}

        </View>
        <Text style={{ color: "white", fontSize: 20, marginTop: "10%" }}>
          Asignar equipo:
        </Text>
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
          searchicon={<FontAwesome name="search" size={20} color={"#0DF5E3"} />}
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
          style={{ ...smallButton.style, marginTop: 10 }}
          onPress={handleNewProject}
          disabled={!loading}
        >
          {!loading ? (
            <ActivityIndicator size="small" color="#201A30" />
          ) : (
            <Text style={smallButton.text}>{"Asignar"}</Text>
          )}
        </Pressable>
        {existingProject ? (
          <Text style={{ color: "red" }}>
            {"El equipo ya está asignado al proyecto"}
          </Text>
        ) : null}
        {teamAdded ? (
          <Text style={{ color: "green" }}>
            {"Equipo asignado exitosamente"}
          </Text>
        ) : null}
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProjectDetalles;
