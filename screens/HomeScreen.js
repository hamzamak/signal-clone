import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from '@rneui/themed'

import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { collection, getDocs } from 'firebase/firestore'
const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])
  const logOut = () => {
    signOut(auth).then(() => { navigation.replace("Login") }).catch((error) => { });
  }
  const getAllChats = async () => {
    const querySnapshot = await getDocs(collection(db, "chats"));
    const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({
            id : doc.id,
            data : doc.data()
           });
           
        })
        setChats(newData); 
  } 
 
  useEffect(() => {
    getAllChats()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff", },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitleAlign : "center",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={logOut}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={logOut}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterChat = (id,chatName) => {
    navigation.navigate("Chat", {
      id,chatName
    })
  }
  return (
    <SafeAreaView>
      <ScrollView>
       {
        chats.map(({id , data : {chatName}}) =>(
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} /> 
        ))
       }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})