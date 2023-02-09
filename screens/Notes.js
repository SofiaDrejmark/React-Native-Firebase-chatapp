import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Root from "../components/Root";
import SecondRoot from "../components/SecondRoot";
import {
  query,
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Notes = () => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const snapshot = onSnapshot(
      query(collection(db, "notes")),
      (querySnapshot) => {
        setItems(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data().item,
          }))
        );
      }
    );

    return () => snapshot();
  }, []);

  const saveItem = async () => {
    await setDoc(doc(db, "notes", item), {
      item: item,
    });
    setItem("");
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "rgba(23, 88, 186, 0.14)" }}
    >
      <Root />
      <SecondRoot />
      <View style={styles.outView}>
        <View style={styles.innerView}>
          <Text style={styles.title}>Notes</Text>
          <View style={styles.inputButtonView}>
            <TextInput
              multiline
              style={styles.textInput}
              placeholder="Text.."
              textContentType="text"
              value={item}
              onChangeText={(item) => setItem(item)}
            />
            <TouchableOpacity onPress={saveItem}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <View style={styles.itemView}>
                <View style={styles.textView}>
                  <Text style={styles.itemText}>{item.item}</Text>
                </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Text style={styles.icon}>x</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Notes;

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
   
    justifyContent: "space-between",
    marginTop: 5,
    borderBottomColor: "rgba(176, 176, 176, 0.73)",
    borderBottomWidth: 0.2,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonView: {},
  icon: {
    fontSize: 20,
    color: "rgba(189, 0, 66, 1)",
  },
  itemText: {
    fontSize: 16,
    paddingLeft: 20,
  },
  inputButtonView: {
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    margin: 10,
  },
  textInput: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#fff",
    height: 35,
    width: "88%",
    marginBottom: 10,
  },
  button: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "rgba(23, 88, 186, 0.14)",
    height: 35,
    justifyContent: "center",
    width: 53,
    alignItems: "center",
  },
  outView: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    borderColor: "gray",
    margin: 30,
  },
});
