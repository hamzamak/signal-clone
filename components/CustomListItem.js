
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/themed'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

const CustomListItem = ({id, chatName , enterChat}) => {
  const [chatMessages , setChatMessages] = useState([])
  useEffect(()=> {
    const chatsCollection = collection(db, "chats");
    const chatDoc = doc(chatsCollection, id); 
    const q = query(collection(chatDoc, "messages"), orderBy('timestamp', 'desc'))
    onSnapshot(q, (querySnapshot) => { //get document data with real-time updates using the onSnapshot()
    setChatMessages(querySnapshot.docs.map(doc => ({
      data: doc.data()
    })))
  })

  }, [])
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id , chatName)} >
     <Avatar
      rounded
      source={{ uri: chatMessages?.[0]?.data?.photoURL ||"https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png" }}
    />
     <ListItem.Content>
      <ListItem.Title style={{fontWeight: "800"}}>{chatName}</ListItem.Title>
      <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
        {chatMessages?.[0]?.data?.displayName   } {chatMessages.length!=0 && " : "} {chatMessages?.[0]?.data?.message }
      </ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem
