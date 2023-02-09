import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import Root from "../components/Root";
import SecondRoot from "../components/SecondRoot";

function Home() {
  return (
    <View>
      <View>
        <Root />
        <SecondRoot />
      </View>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/phone.jpg")}
      >
        <View style={styles.textBackground}>
          <View style={styles.centerView}>
            <Text style={styles.welcomeText1}>Welcome</Text>
            <Image style={styles.image} source={require("../assets/hi.png")} />
            <Text style={styles.welcomeText3}>
              Have a chat with your loved ones, add items to shopping list or
              add a todo.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  centerView: {
    alignItems: "center",
    paddingTop: 80,
  },
  underText: {
    marginTop: 20,
  },
  textBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    height: "100%",

    alignItems: "center",
  },
  profileIcon: {
    marginBottom: 40,
  },

  headerTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#64668f",
    padding: 13,
  },
  welcomeText: {
    fontSize: 20,
    color: "#141524",
  },
  welcomeText1: {
    fontSize: 25,
    color: "#141524",
  },
  image: {},
  welcomeText3: {
    fontSize: 16,
    color: "#141524",
    marginTop: 30,
    margin: 20,
  },
  headerTwoText: {
    color: "#fff",
  },
  home: {
    backgroundColor: "#ebecf0",
    height: "100%",
    paddingTop: 80,
    alignItems: "center",
    borderRadius: 450 / 60,
  },
  homeIcon: {
    color: "#fff",
    fontSize: 30,
  },
  chatIcon: {
    fontSize: 150,
    color: "#8d6cb6",
    marginTop: 30,
  },
  icon: { fontSize: 30, color: "#8d6cb6" },
  houseIcon: {
    fontSize: 80,
    color: "#dcbf64",
  },
});

export default Home;
