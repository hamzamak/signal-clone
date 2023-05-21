import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from '@rneui/themed';
import logo from "../assets/signal-logo.png"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(()=> {
     const unsubscribe = auth.onAuthStateChanged((authUser)=> {
        if (authUser) {
            navigation.replace('Home')
        }
     })
     return unsubscribe ;
    } , [])
    const signIn = async ()=> {
        try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error) {
            Alert.alert("error",error.message);
          }
    }
    return (
        <KeyboardAvoidingView behavior='padding'  style={styles.container} >
            <StatusBar style='light' />
            <Image source={logo} style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus value={email} onChangeText={setEmail}  />
                <Input placeholder="Password"  secureTextEntry={true}  value={password} onChangeText={setPassword}   />
            </View>

            <Button  title="Login" onPress={signIn}  containerStyle={styles.button}/>
            <Button  title="Register" type='outline' onPress={()=> navigation.navigate('Register')}  containerStyle={styles.button}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


const styles = StyleSheet.create({
    container : {
        flex: 1 ,
        alignItems :"center",
        justifyContent : "center",
        padding : 10 , 
        backgroundColor : "white"
    },
    inputContainer: {
     width : 300
    },
    button :{
        width : 200 ,
        marginTop : 10 ,
    }
  });
  