import { Alert, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from '@rneui/themed'
import { AntDesign } from "@expo/vector-icons"
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("")
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerTitleAlign : "center",
      headerBackTitle: "Chats"
    })
  }, [navigation])

  const createChat = async () => {
    const dbRef = collection(db, "chats");
    await addDoc(dbRef, {chatName : input})
      .then(docRef => {
        navigation.goBack();
        console.log("Document has been added successfully");
      })
      .catch(error => {
        Alert.alert("error",error.message);
        console.log(error);
      })
  }
  return (
    <View style={styles.container}>
      <Input placeholder="Enter a chat name" autoFocus value={input} onChangeText={setInput}
        leftIcon={<AntDesign name="wechat" size={24} color="black" />} />
      <Button onPress={createChat} title="Create a New Chat" disabled={input ? false : true} />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white"
  },
  
});
