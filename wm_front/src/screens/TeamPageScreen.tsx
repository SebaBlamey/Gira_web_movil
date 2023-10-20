import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./components/styles";
import { useRoute } from "@react-navigation/native";
import container from "./components/container";
import header from "./components/header";

interface Equipo {
  _id: string;
  nombre: string;
  trabajo: string;
  integrantes: string[]; // Corregido: "intengrantes" a "integrantes"
}

const TeamPage: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
  const [teams, setTeams] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamstr, setTeamsStr] = useState<string>("");

  useEffect(() => {
    const userId = userData.user._id;
    fetch(`http://10.0.2.2:3000/users/${userId}/equipos`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        setTeamsStr(JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los equipos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={container.style}>
      <Text style={header.style}>Hola mundo!</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text style={{...header.subheader, color:'white'}}>Equipos:</Text>
          {teams.map((team) => (
            <View key={team._id}>
              <Text style={{...styles.label, color:'white'}}>{teamstr}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default TeamPage;
