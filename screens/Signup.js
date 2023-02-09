import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSignup = async () => {
    if (email !== "" && password !== "" && displayName !== "") {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: displayName });

        await addDoc(collection(db, "users"), {
          displayName: displayName,
          email: email,
          id: auth.currentUser.uid,
        });
      } catch (error) {
        Alert.alert(error, "Login failed. Please try again.", [{ text: "OK" }]);
      }
    }
  };
  return (
    <View style={styles.outView}>
      <View style={styles.body}>
        <Image style={styles.image} source={require("../assets/limone.png")} />
        <Text style={styles.loginText}>Signup to join the fun!</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={displayName}
          keyboardType="text"
          textContentType="text"
          autoFocus={true}
          onChangeText={(text) => setDisplayName(text)}
        />
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
        <TouchableOpacity onPress={handleSignup}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Allready have an account? Login</Text>
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
    marginBottom: 10,
  },

  textInput: {
    marginBottom: 20,
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 250 / 70,
  },
  button: {
    borderRadius: 20 / 8,
    padding: 15,
    width: 250,
    marginTop: 50,
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
