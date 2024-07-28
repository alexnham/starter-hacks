import { Text, View, SafeAreaView, StyleSheet, TextInput, Pressable, Alert} from "react-native";
import { Link } from "expo-router";
import Navbar from '../../components/Navbar';
import {saveToken, getToken} from './auth';
import { router } from 'expo-router';


import tw from 'twrnc'

import { useEffect, useState } from "react";

export default function Index() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken !== null) {
          router.replace('/dashboard')
        } 
      } catch (error) {
        console.error('Failed to load token from storage', error);
      }
    };

    fetchToken();
  }, [])
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email,
              password,
          }),
      });

      const data = await response.json();
      if (response.ok) {
          Alert.alert('Success', 'Login successful');
          await saveToken(data.username);
          router.replace('/dashboard')
          // Handle successful signup (e.g., navigate to a different screen)
      } else {
          Alert.alert('Error', data.message || 'Something went wrong');
      }
  } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error: ' + error);
  }
  }

  return (
    <View style={tw`flex flex-col justify-between h-full bg-slate-100`}> 
      <View>
      {/* Header of page displaying username and welcome text */}
      <View style={tw`flex justify-center px-8 py-4 h-32 rounded-b-3xl bg-green-600 gap-1`}>
        <Text style={tw`text-white font-bold text-5xl`}>Ecology</Text>
      </View>
      {/* Safe area view to hold form */}
      <SafeAreaView style={tw`flex mx-8 my-8 gap-8`}>
        <View style={tw`flex items-center py-12 gap-5`}>
          <Text style={tw`font-bold text-2xl`}>Login</Text>
          <View style={tw`w-full flex gap-5`}>
            <TextInput 
              placeholder="Enter email"
              style={tw`shadow-md bg-white w-full h-12 rounded-md text-lg px-4 py-1`}
              value={`${email}`}
              onChangeText={newText => setEmail(newText)}
              autoCapitalize='none'
            />
            <TextInput 
              placeholder="Enter password"
              style={tw`shadow-md shadow-inner bg-white w-full h-12 rounded-md text-lg px-4 py-1`}
              value={`${password}`}
              onChangeText={newText => setPassword(newText)}
              autoCapitalize='none'
            />
             <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
          <Link style={tw`mt-12 underline`} href='/signup'>Sign Up</Link>
        </View>
        
      </SafeAreaView>
      

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
  },
  title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
  },
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
  },
  button: {
      backgroundColor: `rgb(22 163 74)`,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
  },
});
