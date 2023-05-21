import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/themed'
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar rounded source={{ uri: messages[0]?.data.photoURL||"https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png" }} />
          <Text style={{ marginLeft: 10, color: "white", fontWeight: "700" }}>{route.params.chatName} </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} >
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),

    })



  }, [navigation,messages])

  const sendMessage = () => {
    Keyboard.dismiss();
    const chatsCollection = collection(db, "chats");
    const chatDoc = doc(chatsCollection, route.params.id);
    const messagesCollection = collection(chatDoc, "messages");

    const newMessage = {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    };

    addDoc(messagesCollection, newMessage)
      .then(() => {
        console.log("Message added successfully!");
      })
      .catch((error) => {
        console.error("Error adding message: ", error);
      });


    setInput('')
  }

  useLayoutEffect(() => {
    //getMessages()
    const chatsCollection = collection(db, "chats");
    const chatDoc = doc(chatsCollection, route.params.id); 
    const q = query(collection(chatDoc, "messages"), orderBy('timestamp', 'desc'))
    onSnapshot(q, (querySnapshot) => { //get document data with real-time updates using the onSnapshot()
    setMessages(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })

  }, [route])
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90} >
        <>
          <ScrollView contentContainerStyle={{paddingTop : 15}}>
            {
              messages.map(({id , data}) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver} >
                    <Avatar rounded source={{uri : data.photoURL}} bottom={-15} right={-5} size={30} position="absolute" containerStyle={{
                      bottom : -15 , right: -5 , position : "absolute" 
                    }}/>
                    <Text style={styles.receiveText} >{data.message} </Text>
                  </View>
                ): (
                  <View key={id} style={styles.sender}>
                    <Avatar rounded  source={{uri : data.photoURL}} bottom={-15} left={-5} size={30} position="absolute" containerStyle={{
                      bottom : -15 , left: -5 , position : "absolute" 
                    }}/>
                    <Text style={styles.senderText} >{data.message} </Text>
                    <Text style={styles.senderName} >{data.displayName} </Text>
                  </View>
                )
              ))
            }
          </ScrollView>
          <View style={styles.footer}>
            <TextInput value={input} onChangeText={setInput} placeholder='Signal Message' style={styles.textInput} />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} disabled= {input ? false : true}>
              <Ionicons name='send' size={24} color= {input ? "#2B68E6" : "gray"}/>
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    color: "gray",
    borderRadius: 30
  },
  receiveText : {
    color : "black",
    fontWeight : "500",
    marginLeft : 10 ,
  },
  senderName : {
    color : "white",
    fontSize : 10 ,
    paddingRight : 10 ,
    left : 10 ,
  },
  senderText : {
    color : "white",
    fontWeight : "500",
    marginLeft : 10 ,
    marginBottom : 15
  },
  sender : {
    backgroundColor : "#2b68e6",
    borderRadius : 20 ,
    padding : 15 ,
    marginLeft :15 ,
    maxWidth : "80%",
    marginBottom : 20 ,
    position : "relative",
    alignSelf : "flex-start" 
  
  },
  receiver : {
    backgroundColor : "#ececec",
    borderRadius : 20 ,
    padding : 15 ,
    marginRight :15 ,
    maxWidth : "80%",
    marginBottom : 20 ,
    position : "relative",
    alignSelf : "flex-end" 
  }
  
})