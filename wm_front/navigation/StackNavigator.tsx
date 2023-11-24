import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../src/screens/StartSreen";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import UserScreen from "../src/screens/UserScreen";
import TeamPage from "../src/screens/TeamPageScreen";
import TeamPageScreen from "../src/screens/TeamPageScreen";
import EditUserScreen from "../src/screens/EditUserScreen";
import RecoverPass from "../src/screens/Recover/RecoverPass";
import RecoverPassToken from "../src/screens/Recover/RecoverPassToken";
import MainProyecto from "../src/screens/UserScreens/MainProyecto";
import CreateTeam from "../src/screens/UserScreens/CreateTeam";
const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#0DF5E3",
          borderBottomColor: "#0DF5E3",
        },
        headerTintColor: "#201A30",
      }}
    >
      {/*<Stack.Screen name="RecoverPass" component={RecoverPass} />*/}
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
        }}
      />
      
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="TeamPage"
        component={TeamPageScreen}
        options = {{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="RecoverPass"
        component={RecoverPass}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CreateTeam"
        component={CreateTeam}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;