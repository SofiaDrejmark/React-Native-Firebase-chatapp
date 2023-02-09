import * as React from "react";
import { useState, useEffect } from "react";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { View, Text } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import { auth } from "./firebase";
import Settings from "./screens/Settings";
import ShoppingList from "./screens/ShoppingList";
import TodoList from "./screens/TodoList";
import Notes from "./screens/Notes";

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      authUser ? setCurrentUser(authUser) : setCurrentUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator
          defaultScreenOption={Home}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ShoppingList" component={ShoppingList} />
          <Stack.Screen name="TodoList" component={TodoList} />
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          defaultScreenOption={Login}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
