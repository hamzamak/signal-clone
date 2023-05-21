import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from '@rneui/themed'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../firebase'
const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                updateProfile(authUser.user, {
                    displayName: name, photoURL: imageUrl || "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png",
                  })
            })
            .catch((error) => {
                Alert.alert("error", error.message);
            });

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "back to login"
        })
    }, [navigation])
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container} >
            <StatusBar style='light' />

            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus value={name} onChangeText={setName} />
                <Input placeholder="Email" value={email} onChangeText={setEmail} />
                <Input placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
                <Input placeholder="Profil Picture URL (optional)" value={imageUrl} onChangeText={setImageUrl} onSubmitEditing={register} />
            </View>

            <Button raised title="Register" onPress={register} containerStyle={styles.button} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    }
});
