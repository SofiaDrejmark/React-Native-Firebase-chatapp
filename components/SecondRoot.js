import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
export default function SecondRoot() {
  const navigation = useNavigation();

  return (
    <View style={styles.outView}>
      <View style={styles.secondHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Chat");
          }}
        >
          <Text style={styles.text2}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  secondHeader: {
    padding: 10,
    backgroundColor: "#6062a5",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  text2: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 20,
  },
  iconView: {
    flexDirection: "row",
    paddingLeft: 150,
  },
});
