import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../components/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import normalInput from "../components/input";
import { smallButton, button } from "../components/button";
import * as style from "../components/calendar";
import { prettyContainer } from "../components/container";
import header from "../components/header";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import dayjs from 'dayjs';
import { format } from 'date-fns';

const TasksPage: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [nombreProyecto, setProjectID] = useState("");
  const [emailUser, setUserID] = useState("");
  const [observation, setObservation] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [startDate, setStartDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY/MM/DD'));
   const [dateInitialModal, setDateInitialModal] = useState(false);
    const [dateFinalModal, setDateFinalModal] = useState(false);
  const [userCurrentDate, setUserCurrentDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [errorDate, setErrorDate] = useState('');
  const [isCloseButtonDisabled, setCloseButtonDisabled] = useState(false);
  const estados = ['PENDIENTE', 'EN PROCESO', 'COMPLETADO', 'CERRADO']
  const [selectedStatus, setSelectedStatus] = useState<string>("PENDIENTE");

  interface UserData {
    userData: any;
  }

  useEffect(() => {
    setStatus(selectedStatus);
  }
  , [selectedStatus]);

  const userData = (route.params as UserData)?.userData;

  const handleDateInitialChange = (date: DateType) => {
    const selectedDate = date ? dayjs(date.toString()).format('YYYY/MM/DD') : '';
    if (selectedDate < userCurrentDate) {
      setErrorDate('La fecha inicial no puede ser anterior a la fecha actual');
      setCloseButtonDisabled(true);
    } else {
      setStartDate(selectedDate);
      setErrorDate('');
      setCloseButtonDisabled(false); 
    }
  };

  const handleDateFinalChange = (date: DateType) => {
    const selectedDate = date ? dayjs(date.toString()).format('YYYY/MM/DD') : '';

    
    if (selectedDate < startDate || selectedDate < userCurrentDate) {
      setErrorDate('La fecha final no puede ser anterior a la fecha inicial o la fecha actual');
      setCloseButtonDisabled(true); 
    } else {
      setEndDate(selectedDate);
      setErrorDate('');
      setCloseButtonDisabled(false); 
    }
  };



  const handleCreateTask = async () => {
    if (!taskName || !nombreProyecto || !status) {
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
          fechaInicio: format(new Date(startDate), 'dd/MM/yyyy'),
          fechaFin: format(new Date(endDate), 'dd/MM/yyyy') ,
          nombreProyecto: nombreProyecto,
          emailUser: emailUser,
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

  const toggleModalDateInitial = () => {
    setDateInitialModal(true);
    setErrorDate(''); // Reiniciar el mensaje de error al abrir el modal de fecha inicial
    setCloseButtonDisabled(false); // Habilitar el botón de cerrar al abrir el modal

  }

  const toggleModalDateFinal = () => {
    setDateFinalModal(true);
    setErrorDate(''); 
    setCloseButtonDisabled(false);   
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <ScrollView style={{backgroundColor:"#05161A"}}>
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
          
          
          
          <Text style={{...style.modalDescription, color:'#fff'}}>
                    Selecciona las fechas de la tarea.
                  </Text>
                    <TouchableOpacity style={style.dateInitial} onPress={() => toggleModalDateInitial()}>
                      <Text style={style.buttonLabel}>Fecha Inicial</Text>
                    </TouchableOpacity>
                    <Text style={{...style.modalDescription, color:'#fff'}}>
                    Fecha inicial seleccionada : {format(new Date(endDate), 'dd/MM/yyyy')}
                  </Text>

                    <TouchableOpacity style={style.dateFinal} onPress={() => toggleModalDateFinal()}>
                      <Text style={style.buttonLabel}>Fecha Final</Text>
                    </TouchableOpacity>

                  <Text style={{...style.modalDescription, color:'#fff'}}>
                  Fecha final seleccionada: {format(new Date(endDate), 'dd/MM/yyyy')}
                  </Text>
                    <Modal
              animationType="slide"
              transparent={true}
              visible={dateInitialModal}
              onRequestClose={() => setDateInitialModal(false)}
            >
              <View style={style.modalContainerCalendar}>
                <View style={style.modalContentCalendar}>
                  <Text style={style.modalTitle}>Selecciona Fecha Inicial</Text>

                  <View style={style.buttonLabel}>
                    <DateTimePicker value={startDate} onValueChange={handleDateInitialChange} />
                  </View>

                  {errorDate && <Text style={style.errorText}>{errorDate}</Text>} 

                  <TouchableOpacity
                    style={[style.cancelButtonCalendar, isCloseButtonDisabled && { opacity: 0.5 }]}
                    onPress={() => setDateInitialModal(false)}
                    disabled={isCloseButtonDisabled} // Deshabilitar el botón según el estado
                  >
                    <Text style={style.buttonLabel}>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={dateFinalModal}
              onRequestClose={() => setDateFinalModal(false)}
            >
              <View style={style.modalContainerCalendar}>
                <View style={style.modalContentCalendar}>
                  <Text style={style.modalTitle}>Selecciona Fecha Final</Text>

                  <DateTimePicker value={endDate} onValueChange={handleDateFinalChange} />

                  {errorDate && <Text style={style.errorText}>{errorDate}</Text>}

                  <TouchableOpacity
                    style={[style.cancelButtonCalendar, isCloseButtonDisabled && { opacity: 0.5 }]}
                    onPress={() => setDateFinalModal(false)}
                    disabled={isCloseButtonDisabled} // Deshabilitar el botón según el estado
                  >
                    <Text style={style.buttonLabel}>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>


          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Tarea del Proyecto"
            value={nombreProyecto}
            onChangeText={(text) => setProjectID(text)}
          />
          <TextInput
            style={{ ...normalInput.input, width: 300 }}
            placeholder="Usuario a ingresar (Opcional)"
            value={emailUser}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TasksPage;