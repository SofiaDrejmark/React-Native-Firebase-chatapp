import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Root from "../components/Root";
import SecondRoot from "../components/SecondRoot";
import {
  query,
  onSnapshot,
  addDoc,
  collection,
  orderBy,
  createdAt,
  desc,
} from "firebase/firestore";

import { db, auth } from "../firebase";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const snapshot = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            id: doc.data().id,
            message: doc.data().message,
            user: doc.data().user,
            createdAt: doc.data().createdAt,
          }))
        );
      }
    );

    return () => snapshot();
  }, []);

  const sendMessage = useCallback(
    (messages = []) => {
      setMessages((prevMessages) => (prevMessages, messages));
      addDoc(collection(db, "messages"), {
        id: Math.floor(Math.random() * 1000000),
        message: message,
        user: auth.currentUser.displayName,
        createdAt: Date(),
      });

      setMessage("");
    },
    [message]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "rgba(23, 88, 186, 0.14)" }}
    >
      <Root />
      <SecondRoot />
      <View style={styles.outView}>
        <View style={styles.innerView}>
          <Text style={styles.title}>Chat</Text>
          <View style={styles.inputButtonView}>
            <TextInput
              multiline
              style={styles.textInput}
              placeholder="Text.."
              textContentType="text"
              value={message}
              onChangeText={(item) => setMessage(item)}
            />
            <TouchableOpacity onPress={sendMessage}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Send</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View
                style={auth.currentUser ? styles.itemView1 : styles.itemView2}
              >
                <Text style={styles.itemText}>{item.message}</Text>
                <Text style={styles.itemText2}>{item.user}</Text>
                <Text style={styles.itemText3}>{item.createdAt}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Chat;

const styles = StyleSheet.create({
  itemView1: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    border: 0.5,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderRadius: 4,
    padding: 6,
    justifyContent: "flex-end",
    maxWidth: 200,
    flexDirection: "column",
  },
  itemView2: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    border: 0.5,
    backgroundColor: "rgba(43, 112, 222, 0.72)",
    justifyContent: "flex-start",
    maxWidth: 200,
    padding: 6,
    flexDirection: "column",
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
  complete: {
    color: "green",
    textDecorationLine: "line-through",
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 0.5,
  },

  itemText: {
    fontSize: 16,
  },
  itemText2: {
    fontSize: 10,
  },
  itemText3: {
    fontSize: 8,
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
