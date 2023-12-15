import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../components/styles";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { prettyContainer } from "../components/container";
import { smallButton } from "../components/button";
import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {Popup} from 'react-native-popup-confirm-toast'

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface Integrante {
  user: string;
  role: string;
  _id: string;
}

const EquipoDetalles: React.FC = () => {
  const route = useRoute();
  const teamData = route.params?.equipo;
  const userData = route.params?.userData;
  const temData=teamData.equipo;
  const [integrantes, setIntegrantes] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const roles = ["Miembro", "Admin"];
  const [selectedRole, setSelectedRole] = useState<string>("Miembro");
  const [userAdmin, setUserAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

  const handleDeleteTeam = async (userId: string) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/equipo/delete/${teamData._id}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setTimeout(() => {
          // Verificar si userData está definido antes de navegar
          userData && navigation.navigate("TeamPage", { userData });
        }, 1000);
      } else {
        const responseData = await response.json();
        if (response.status === 404 && responseData.message === 'Equipo no encontrado') {
          console.error('Error: Equipo no encontrado');
        } else {
          console.error(`Error de red: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  }
  

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/users/all");
      if (response.ok) {
        const allUsersData = await response.json();
  
        const usersNotOnTeam = await Promise.all(
          allUsersData.map(async (user) => {
            try {
              const response = await fetch(
                `http://localhost:3000/equipo/${teamData._id}/${user.email}/userOnTeam`
              );
              const isUserOnTeam = await response.json();
              return isUserOnTeam ? null : user;
            } catch (errorOnTeamCheck) {
              console.error("Error al verificar el estado del usuario en el equipo", errorOnTeamCheck);
              return user;
            }
          })
        );
  
        const filteredUsers = usersNotOnTeam.filter(Boolean);
  
        setAllUsers(filteredUsers);
      } else {
        console.error("Error al obtener la lista de usuarios. Estado de la respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener la lista de usuarios", error);
    }
  }, [teamData._id]);
  

    const fetchUserAdmin = useCallback(async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/equipo/${teamData._id}/${userData.user._id}/roleOnTeam`
        );
        if (response.ok) {
          const role = await response.text();
          if (role === "Admin") {
            setUserAdmin(true);
          }
        } else {
          console.error(`Error en la llamada a la API: ${response.status}`);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
    , [teamData._id, userData.user._id]);

    const fetchUsernames = useCallback(async () => {
      const usersData = await Promise.all(
        teamData.integrantes.map(async (integrante: Integrante) => {
          const userId = integrante.user;
          console.log(`userId en EquipoDetalles: ${userId}`);

          const responseRole = await fetch(
            `http://localhost:3000/equipo/${teamData._id}/${userId}/roleOnTeam`
          );
          console.log(`response: ${responseRole.status}`);
          const role = responseRole.ok ? await responseRole.text() : "Miembro";

          const responseUser = await fetch(
            `http://localhost:3000/users/findById/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const userData: User = await responseUser.json();

          return {
            ...userData,
            role,
          };
        })
      );
      setIntegrantes(usersData);
    }
    , [teamData._id]);

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        console.log(
          "La pantalla EquipoDetalles estÃ¡ en primer plano. Recargando datos..."
        );
        fetchUsernames();
        fetchAllUsers();
        fetchUserAdmin();
      });
      return unsubscribe;
    }, [navigation, fetchUsernames, fetchAllUsers, fetchUserAdmin]);

  const handleDeleteMemberTeam = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/equipo/leave/${teamData._id}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchUsernames();
        fetchAllUsers();
        fetchUserAdmin();
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  }
      

  const handleNewMemberTeam = async () => {
    setUserAdded(false);
    if (!selectedUser) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/equipo/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _idTeam: teamData._id,
          _userEmail: selectedUser,
          _role: selectedRole,
        }),
      });
      if (response.ok) {
        setShouldLoad((prev) => !prev);
        setUserAdded(true);
        setLoading(false);
        navigation.navigate("TeamPage",{userData});
      }
    } catch (error) {
      setUserAdded(false);
      console.error("Error de red", error);
      setLoading(false);
    }
  };

  const teamName = teamData?.nombre || "Nombre del equipo";
  const proyecto = teamData?.trabajo || "Ninguno";

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
          <View style={{ ...prettyContainer.headerContainer }}>
            <Image
              source={require("../../../assets/team-logo.png")}
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
              borderColor: "#0F989C",
              backgroundColor: "#072E33",
              borderRadius: 10,
              alignSelf: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Integrantes:
            </Text>
            <View>
              {integrantes.map((user, index) => (
                <View
                key={index}
                style={{
                  alignContent: "flex-start",
                  marginTop: "5%",
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#0F989C",
                  borderRadius: 10,
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                  <Text key={index} style={{ color: "white", fontSize: 16 }}>
                    {user.email} [{user.role}]
                    {userAdmin && user.email != userData.user.email && (
                      <TouchableOpacity
                      onPress={() =>
                        Popup.show({
                            type: 'confirm',
                            title: 'Eliminar miembro!',
                            textBody:'Estas seguro que quieres borrar a este miembro? ',
                            buttonText: 'Si',
                            confirmText: 'No',
                            iconEnabled: false,
                            modalContainerStyle : {
                              backgroundColor: '#072E33',
                              borderColor: '#0F989C',
                              borderRadius: 8,
                              borderWidth: 1,
                            },
                            titleTextStyle: {
                              color: '#0F989C',
                              fontSize: 25,
                              fontWeight: 'bold',
                            },
                            descTextStyle: {
                              color: '#fff',
                            },
                            okButtonStyle: {
                              backgroundColor: '#0F989C',
                              padding: 10,
                            },
                            confirmButtonStyle: {
                              color: '#fff',
                              borderWidth: 1,
                              borderColor: '#0F989C',
                            },
                            callback: () => {
                                handleDeleteMemberTeam(user._id);
                                Popup.hide();
                            },
                            cancelCallback: () => {
                                Popup.hide();
                            },
                        })
                    }
                      >
                        <FontAwesome
                          name="trash" 
                          size={20}
                          color="red"
                          
                          style={{ marginLeft: 20, alignSelf: "flex-end"}}
                        />
                      </TouchableOpacity>

                    )}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              alignContent: "flex-start",
              marginTop: "5%",
              width: "80%",
              borderWidth: 1,
              borderColor: "#0F989C",
              backgroundColor: "#072E33",
              borderRadius: 10,
              alignSelf: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Proyecto actual
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>{proyecto}.</Text>
          </View>
          <Text style={{ color: "white", fontSize: 20, marginTop: "10%" }}>
            Ingresar nuevo miembro:
          </Text>
          <SelectList
            boxStyles={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0F989C",
              backgroundColor: "#072E33",
              maxWidth: 300,
              width: 300,
              alignSelf: "center",
              marginTop: "5%",
            }}
            placeholder="Seleccionar usuario"
            notFoundText="No hay usuarios disponibles"
            dropdownStyles={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0F989C",
              backgroundColor: "#072E33",
              maxWidth: 300,
              width: 300,
              alignSelf: "center",
            }}
            arrowicon={
              <FontAwesome name="chevron-down" size={20} color={"#0F989C"} />
            }
            dropdownTextStyles={{ color: "white", fontSize: 16 }}
            closeicon={<FontAwesome name="user" size={20} color={"#0F989C"} />}
            searchicon={
              <FontAwesome name="search" size={20} color={"#0F989C"} />
            }
            searchPlaceholder="Buscar usuario"
            searchPlaceholderTextColor={"white"}
            inputStyles={{ color: "white", fontSize: 16, marginLeft: 10 }}
            setSelected={(user) => setSelectedUser(user)}
            data={allUsers.map((user) => ({
              key: user.email,
              value: `${user.username} - ${user.email}`,
            }))}
            save="key"
          />
          {selectedUser && (
            <SelectList
              placeholder="Seleccionar rol"
              notFoundText="No se encuentra el rol"
              boxStyles={{
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: "#072E33",
                borderColor: "#0F989C",
                width: 300,
                alignSelf: "center",
                marginTop: "2%",
              }}
              search={false}
              defaultOption={{ key: "0", value: roles[0] }}
              dropdownStyles={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#0F989C",
              backgroundColor: "#072E33",
                maxWidth: 300,
                width: 300,
                alignSelf: "center",
              }}
              arrowicon={
                <FontAwesome name="chevron-down" size={20} color={"#0F989C"} />
              }
              dropdownTextStyles={{ color: "white", fontSize: 16 }}
              closeicon={
                <FontAwesome name="user" size={20} color={"#0F989C"} />
              }
              searchicon={
                <FontAwesome name="search" size={20} color={"#0F989C"} />
              }
              searchPlaceholder="Buscar rol"
              searchPlaceholderTextColor={"white"}
              inputStyles={{ color: "white", fontSize: 16, marginLeft: 10 }}
              setSelected={(role) => setSelectedRole(role)}
              data={roles.map((role) => ({
                key: role,
                value: role,
              }))}
              save="key"
            />
          )}

          <Pressable
            style={{ ...smallButton.style, marginTop: 10 }}
            onPress={handleNewMemberTeam}
            disabled={!loading || !selectedUser}
          >
            {!loading ? (
              <ActivityIndicator size="small" color="#201A30" />
            ) : (
              <Text style={smallButton.text}>{"Agregar"}</Text>
            )}
          </Pressable>
          {userAdmin && (
            <Pressable
              style={{
                ...smallButton.style,
                backgroundColor: "red",
                marginTop: 10,
              }}
              onPress={() => {
                Popup.show({
                  type: 'confirm',
                  title: 'Eliminar miembro!',
                  textBody:'Estas seguro que quieres borrar a este miembro? ',
                  buttonText: 'Si',
                  confirmText: 'No',
                  iconEnabled: false,
                  modalContainerStyle : {
                    backgroundColor: '#072E33',
                    borderColor: '#0F989C',
                    borderRadius: 8,
                    borderWidth: 1,
                  },
                  titleTextStyle: {
                    color: '#0F989C',
                    fontSize: 25,
                    fontWeight: 'bold',
                  },
                  descTextStyle: {
                    color: '#fff',
                  },
                  okButtonStyle: {
                    backgroundColor: '#0F989C',
                    padding: 10,
                  },
                  confirmButtonStyle: {
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: '#0F989C',
                  },
                  callback: () => {
                      handleDeleteTeam(userData.user._id);
                      Popup.hide();
                  },
                  cancelCallback: () => {
                      Popup.hide();
                  },
              })
              }}
            >
              <Text style={{ ...smallButton.text, color: "white" }}>
                {"Eliminar"}
              </Text>
            </Pressable>
          )}
          {userAdded ? (
            <Text style={{ color: "green" }}>
              {"Usuario agregado exitosamente"}
            </Text>
          ) : null}
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EquipoDetalles;