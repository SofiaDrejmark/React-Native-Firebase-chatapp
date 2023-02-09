import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
export default function Root() {
  const navigation = useNavigation();

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.outView}>
      <View style={styles.firstHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ShoppingList");
          }}
        >
          <Image
            style={styles.image}
            source={require("../assets/wish-list.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TodoList");
          }}
        >
          <Image
            style={styles.image}
            source={require("../assets/sticky-note.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Notes");
          }}
        >
          <Image
            style={styles.image2}
            source={require("../assets/pencil.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.secondHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Image
            style={styles.imageRight}
            source={require("../assets/profile.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <Image
            style={styles.imageRight}
            source={require("../assets/logout.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outView: {
    backgroundColor: "#393a65",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
  },
  firstHeader: {
    flexDirection: "row",
    backgroundColor: "#393a65",
  },
  secondHeader: {
    flexDirection: "row",
    backgroundColor: "#393a65",
  },
  image: {
    width: 38,
    height: 38,
    margin: 10,
  },
  image2: {
    width: 34,
    height: 34,
    margin: 10,
  },
  imageRight: {
    width: 34,
    height: 34,
    margin: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  icon: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 18,
  },
  iconView: {
    paddingLeft: 140,
  },
});
