import React, { useEffect, useState } from "react";
import { View, Image, Text, ActivityIndicator, Pressable } from "react-native";
import styles from "../components/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { container, prettyContainer } from "../components/container";
import header from "../components/header";
import { defaultButton, equipoButton } from "../components/button";

interface Proyecto {
  _id: string;
  nombre: string;
  descripcion: string;
  equipos: string[];
  tareas: string[];
}

const ProyectoPage: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const naviagtion = useNavigation();
  const [loading, setLoading] = useState(true);

  const handleProyectoButtonClick = (proyecto: Proyecto) => {
    console.log(proyecto);
  }

  useEffect(() => {
    fetch(`https://10.0.2.2:3000/trabajo/findAll`)
    .then((response) => response.json())
    .then((data) => {
      setProjects(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error al cargar los proyectos:", error);
      setLoading(false);
    });
  }, [])

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
          source={require("../../../assets/proyecto-logo.png")}
          style={{ ...styles.image }}
        />
      </View>
      <Text style={{fontSize:20, color:'#fff',marginTop:'10%'}}>
        Tus proyectos:
      </Text>
      {projects.length === 0 ? (
        <Text style={{ fontSize: 15, color: "#fff" }}>
        No existen proyectos :(
      </Text>
      ):(
        projects.map((project) => (
          <Pressable
            key={project._id}
            
          >
            <Text style={equipoButton.text}>{project.nombre}</Text>
          </Pressable>
        ))
      )}
    </View>
  );
};

export default ProyectoPage;
