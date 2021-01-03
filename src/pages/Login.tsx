import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Image, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import * as SecureStorage from 'expo-secure-store'

import LogoImage from '../../assets/adaptive-icon.png'

import api from '../services/api';

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleSubmit(){
        setLoading(true)
        await api
        .post('/users/auth',{username,password})
        .then(res=>{
            setLoading(false)
            SecureStorage.setItemAsync('token',res.data.token)
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <View style={styles.container}>
        <ActivityIndicator 
            style={styles.loader}
            animating={loading}
            color="#008891"
            size="large"
        />
        <Image 
            style={styles.logoImage}
            source={LogoImage}
            width={0}            
            height={0}
         />
         <View style={styles.formContainer}>
            
        <View style={styles.formField}>
            <Feather
                style={styles.icon}  
                name="user"
                color="#008891"
            />
            <TextInput
                style={styles.input}  
                placeholder="username"
                placeholderTextColor="#fff9"
                value={username}
                onChangeText={setUsername}
            />
        </View>
        <View style={styles.formField}>
            <Feather
                style={styles.icon}  
                name="lock"
                color="#008891"
            />
            <TextInput
                style={styles.input}  
                placeholderTextColor="#fff9"
                placeholder="Password"
                secureTextEntry={true}
                textContentType="newPassword"
                value={password}
                onChangeText={setPassword}
            />
        </View>
        <RectButton 
            style={styles.loginButton}
            onPress={()=>handleSubmit()}
        >
            <Text style={styles.loginButtonText}>Login</Text>
        </RectButton>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  formContainer:{
      width: '100%',
      height: '40%',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',

  },
  formField:{
      flexDirection:'row',
      lineHeight:20,
      fontSize:20,
      paddingVertical:5,
      paddingHorizontal:20,
      backgroundColor:'#3335',
      width:'80%',
      margin:5,
  },
  input: {
    color: "#fff",

    fontSize: 20,

    },
    icon: {
        position: 'relative',
        // top: -10,
        fontSize: 30,

        width: 40,
        height: 50,

        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center",

    },
    loginButton:{
        backgroundColor: '#333',
        color:'#fff',
        width: 100,
        height: 50,
        lineHeight: 20,
        fontSize:40,
        paddingHorizontal:10,
        paddingVertical:5,
        textAlign:'center',
        textAlignVertical:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
    },
    loginButtonText:{
        color:'#fff',
        lineHeight: 20,
        fontSize:20,
    },
    logoImage:{
      width: 150,
      height: 150,
    },
    loader:{
        zIndex: 5,
    }
});
