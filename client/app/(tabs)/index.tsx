import { Text, View, SafeAreaView } from "react-native";
import { Link } from "expo-router";

import tw from 'twrnc'

export default function Index() {
  return (
    <View style={tw`flex h-full`}> 
      {/* Header of page displaying username and welcome text */}
      <View style={tw`flex justify-center px-8 py-4 h-32 rounded-3xl bg-green-600 gap-1`}>
        <Text style={tw`text-white font-bold text-3xl`}>Environment App</Text>
      </View>
      {/* Safe area view to hold form */}
      <SafeAreaView style={tw`flex mx-8 my-8 gap-8`}>
        
      </SafeAreaView>
    </View>
  );
}
