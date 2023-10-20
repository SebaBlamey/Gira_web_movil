import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../src/screens/StartSreen";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import UserScreen from "../src/screens/UserScreen";
<<<<<<< HEAD
import TeamPage from "../src/screens/TeamPageScreen";
import TeamPageScreen from "../src/screens/TeamPageScreen";
import EditUserScreen from "../src/screens/EditUserScreen";
=======
import RecoverPass from "../src/screens/Recover/RecoverPass";
import RecoverPassToken from "../src/screens/Recover/RecoverPassToken";
>>>>>>> dbc9111889dea150e71b9401904cd7969f890a51

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#201A30",
          borderBottomColor: "#201A30",
        },
        headerTintColor: "#fff",
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
<<<<<<< HEAD
        name="TeamPage"
        component={TeamPageScreen}
        options = {{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
=======
        name="RecoverPass"
        component={RecoverPass}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="RecoverPassToken"
        component={RecoverPassToken}
>>>>>>> dbc9111889dea150e71b9401904cd7969f890a51
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
