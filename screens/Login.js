import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity, Image, Alert
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        Alert.alert(error, "Login failed. Please try again.", [{ text: "OK" }]);
      });
    }
  };

  return (
    <View style={styles.outView}>
      <View style={styles.body}>
      <Image style={styles.image} source={require("../assets/limon.png")}/>
        <Text style={styles.loginText}>Login to join the fun!</Text>
        

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#b1b3c4",
    padding: 15,
    height: 450,
    marginTop: 100,
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 450 / 60,
  },
  loginText: {
    color: "#444444",
    fontSize: 20,
    marginBottom: 10
  },

  textInput: {
    marginBottom: 10,
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 250 / 70,
  },
  button: {
    borderRadius: 20 / 8,
    padding: 15,
    width: 250,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: "rgba(91, 92, 128, 0.89)",
    display: "flex",
    alignItems: "center",
    fontSize: 17,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
