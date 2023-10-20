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
import RecoverPass from "../src/screens/Recover/RecoverPass";
import RecoverPassToken from "../src/screens/Recover/RecoverPassToken";
=======

import TeamPage from "../src/screens/TeamPageScreen";
import TeamPageScreen from "../src/screens/TeamPageScreen";
import EditUserScreen from "../src/screens/EditUserScreen";

import RecoverPass from "../src/screens/Recover/RecoverPass";
import RecoverPassToken from "../src/screens/Recover/RecoverPassToken";

>>>>>>> 0dbcced167bf6105300fd41850abd2fcf4b98e58

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
          headerShown: false,
        }}
      />
      <Stack.Screen
<<<<<<< HEAD
=======

>>>>>>> 0dbcced167bf6105300fd41850abd2fcf4b98e58
        name="TeamPage"
        component={TeamPageScreen}
        options = {{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
<<<<<<< HEAD
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
=======
>>>>>>> 0dbcced167bf6105300fd41850abd2fcf4b98e58
        name="RecoverPass"
        component={RecoverPass}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="RecoverPassToken"
        component={RecoverPassToken}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
