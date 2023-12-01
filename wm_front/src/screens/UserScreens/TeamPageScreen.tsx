import React, { useEffect, useState } from "react";
import { View, Image, Text, ActivityIndicator, Pressable } from "react-native";
import styles from "../components/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { container, prettyContainer } from "../components/container";
import header from "../components/header";
import { defaultButton, equipoButton } from "../components/button";

interface Equipo {
  _id: string;
  nombre: string;
  trabajo: string;
  integrantes: string[]; 
}

const TeamPage: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
  const [teams, setTeams] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log(
        "La pantalla TeamPage está en primer plano. Recargando datos..."
      );
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const userId = userData.user._id;
    console.log(`userID: ${userId}`);
    fetch(`http://localhost:3000/equipo/${userId}/findTeamsFromUserId`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los equipos:", error);
        setLoading(false);
      });
  }, []);

  const navigateToCreateTeam = () => {
    navigation.navigate("CreateTeam", { userData });
  };

  const handleEquipoButtonClick = (equipo: Equipo) => {
    navigation.navigate("EquipoDetalles", { equipo });
  };

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
          source={require("../../../assets/team-logo.png")}
          style={{ ...styles.image }}
        />
      </View>
      <Text style={{ fontSize: 20, color: "#fff", marginTop: "10%" }}>
        Tus equipos:
      </Text>
      {teams.length === 0 ? (
        <Text style={{ fontSize: 15, color: "#fff" }}>
          No estás en ningún equipo :(
        </Text>
      ) : (
        <View>
          {teams.map((equipo) => (
            <Pressable
              key={equipo._id}
              style={equipoButton.style}
              onPress={() => handleEquipoButtonClick(equipo)}
            >
              <Text style={equipoButton.text}>{equipo.nombre}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Pressable onPress={navigateToCreateTeam} style={defaultButton.style}>
          <Text style={defaultButton.text}>Crear equipo</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TeamPage;
