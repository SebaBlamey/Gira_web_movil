import { useRoute ,useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Picker, Pressable } from 'react-native';

import { button } from '../components/button'
interface EditTaskProps {
  route: {
    params: {
      id: string;
    };
  };
}

const EditTask: React.FC<EditTaskProps> = ({ route }) => {
  const [task, setTask] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    observacion: '',
    userID: '',
    estado: '',
  });

  const { id } = route.params;



  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTask(data);
        } else {
          throw new Error('Error al obtener los detalles de la tarea');
        }
      } catch (error) {
        console.error('Error al obtener los detalles de la tarea:', error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleInputChange = (name, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdateTask = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        
        console.log('Tarea actualizada');
        
        
      } else {
        throw new Error('Error al actualizar la tarea');
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
    
    
   
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <View style={{ backgroundColor: '#f4f4f4', padding: 20, borderRadius: 10, width: '80%' }}>
    <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20, color: '#333', fontWeight: 'bold' }}>
      Detalles de la Tarea
    </Text>

    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 10, color: '#333', fontWeight: 'bold' }}>
        {task.nombre}
      </Text>
    </View>

    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 8, color: '#333', fontWeight: 'bold' }}>
        Fecha de Inicio
      </Text>
      <TextInput
        value={task.fechaInicio}
        onChangeText={(value) => handleInputChange('fechaInicio', value)}
        placeholder="Ingrese la nueva fecha de inicio"
        style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
      />
    </View>

    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 8, color: '#333', fontWeight: 'bold' }}>
        Fecha de Fin
      </Text>
      <TextInput
        value={task.fechaFin}
        onChangeText={(value) => handleInputChange('fechaFin', value)}
        placeholder="Ingrese la nueva fecha de fin"
        style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
      />
    </View>

    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 8, color: '#333', fontWeight: 'bold' }}>
        Observación
      </Text>
      <TextInput
        value={task.observacion}
        onChangeText={(value) => handleInputChange('observacion', value)}
        placeholder="Ingrese una nueva observación"
        style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
      />
    </View>

    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 8, color: '#333', fontWeight: 'bold' }}>
        Nueva ID de Usuario
      </Text>
      <TextInput
        value={task.userID}
        onChangeText={(value) => handleInputChange('userID', value)}
        placeholder="Ingrese la nueva ID de usuario"
        style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
      />
    </View>

    <View style={{ marginBottom: 16 }}>
    <Picker
            selectedValue={task.estado}
            onValueChange={(itemValue: any) => handleInputChange('estado', itemValue)}
            style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
          >
            <Picker.Item label="PENDIENTE" value="PENDIENTE" />
            <Picker.Item label="EN PROCESO" value="EN PROCESO" />
            <Picker.Item label="COMPLETADO" value="COMPLETADO" />
            <Picker.Item label="CERRADO" value="CERRADO" />
          </Picker>
    </View>

    <Pressable style={button.style} onPress={ (handleUpdateTask) } >
        <Text>Actualizar Tarea!</Text>
    </Pressable>
    
  </View>
</View>
  );
};

export default EditTask;
