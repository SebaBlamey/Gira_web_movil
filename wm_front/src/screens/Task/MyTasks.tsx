import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { defaultButton } from '../components/button';

const MyTasks: React.FC = () => {
  interface UserData {
    userData: any;
  }

  const [userTasks, setUserTasks] = useState([]);
  const route = useRoute();
  const navigation = useNavigation(); // Agrega esta línea para obtener el objeto navigation
  const userData = (route.params as UserData)?.userData;
  const idUser = (route.params as UserData)?.userData;
  const navigateToEditTask = (id: string) => {
    navigation.navigate('EditTask', { id });
  };

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/user/${userData.user._id}/tasks`);
        if (response.ok) {
          const data = await response.json();
          setUserTasks(data);
        } else {
          throw new Error('Error al obtener las tareas del usuario');
        }
      } catch (error) {
        console.error('Error al obtener las tareas del usuario:', error);
      }
    };

    fetchUserTasks();
  }, [userData.user._id]);

  return (
    <View style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Text style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        Tareas del Usuario {userData.user.username}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {userTasks.map((task) => (
          <View
            key={task._id}
            style={{
              backgroundColor: '#f4f4f4',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '15px',
              width: '80%',
              maxWidth: '500px',
              border: '1px solid #ccc',
            }}
          >
            <Text style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>{task.nombre}</Text>
            <Text style={{ marginBottom: '5px' }}>
              <Text style={{ fontWeight: 'bold' }}>Estado:</Text> {task.estado}
            </Text>

            <Pressable onPress={() => navigateToEditTask(task._id)} style={defaultButton.style}>
              <Text>Editar Tarea</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MyTasks;
