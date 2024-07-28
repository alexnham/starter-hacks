import { Text, View, SafeAreaView, TextInput, Button } from "react-native";
import { Link, router } from "expo-router";
import Navbar from '../../components/Navbar';

import tw from 'twrnc'

import { useState } from "react";

export default function Index() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(email : string, password : string) => {
    const response = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    if (!response.ok){
      return
    }

    const user = await response.json()
    router.replace('/dashboard')
  }

  return (
    <View style={tw`flex h-full bg-slate-100`}> 
      {/* Header of page displaying username and welcome text */}
      <View style={tw`flex justify-center px-8 py-4 h-32 rounded-3xl bg-green-600 gap-1`}>
        <Text style={tw`text-white font-bold text-3xl`}>Environment App</Text>
      </View>
      {/* Safe area view to hold form */}
      <SafeAreaView style={tw`flex mx-8 my-8 gap-8`}>
        <View style={tw`flex items-center py-12 gap-5`}>
          <Text style={tw`font-bold text-2xl`}>Login</Text>
          <View style={tw`w-full flex gap-5 items-center`}>
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
            <View style={tw`bg-green-500 rounded-md w-48`}>
              <Button title="LOGIN" color="#FFFFFF" onPress={() => handleSubmit(email, password)}/>
            </View>
            
          </View>
          <Link style={tw`mt-12 underline`} href='/signup'>Sign Up</Link>
        </View>
        <Navbar/>
      </SafeAreaView>
    </View>
  );
}
