import { Text, View, SafeAreaView, TextInput } from "react-native";
import { Link } from "expo-router";
import Navbar from '../../components/Navbar';

import tw from 'twrnc'

import { useState } from "react";

export default function Index() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={tw`flex flex-col justify-between h-full bg-slate-100`}> 
      <View>
      {/* Header of page displaying username and welcome text */}
      <View style={tw`flex justify-center px-8 py-4 h-32 rounded-3xl bg-green-600 gap-1`}>
        <Text style={tw`text-white font-bold text-3xl`}>Environment App</Text>
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
            />
            <TextInput 
              placeholder="Enter password"
              style={tw`shadow-md shadow-inner bg-white w-full h-12 rounded-md text-lg px-4 py-1`}
              value={`${password}`}
              onChangeText={newText => setPassword(newText)}
            />
          </View>
          <Link style={tw`mt-12 underline`} href='/signup'>Sign Up</Link>
        </View>
        
      </SafeAreaView>
      

      </View>
      <Navbar/>
    </View>
  );
}
