import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import Root from "../components/Root";
import SecondRoot from "../components/SecondRoot";
import { getAuth } from "firebase/auth";

export default function Settings() {
  const auth = getAuth();

  return (
    <View>
      <Root />
      <SecondRoot />

      <ImageBackground
        source={require("../assets/phone.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.textBackground}>
          <Text style={styles.displayNameTe}>Profile Information </Text>
          <Text style={styles.displayNameTex}>Username: </Text>
          <Text style={styles.displayNameText}>
            {auth.currentUser.displayName}
          </Text>
          <Text style={styles.displayNameTex}>Email: </Text>
          <Text style={styles.displayNameText}>{auth.currentUser.email}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  textBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    height: "100%",
    width: "100%",
    padding: 30,
  },
  imageBackground: {
    height: "100%",
  },
  displayNameTex: {
    marginTop: 30,
    fontSize: 16,
    color: "#133568",
  },
  displayNameText: {
    fontSize: 16,
    color: "#133568",
  },
  displayNameTe: {
    fontSize: 18,
    color: "#133568",
    alignSelf: "center",
  },
});
