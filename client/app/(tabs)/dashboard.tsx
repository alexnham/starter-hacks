import { Text, View, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import Navbar from '../../components/Navbar';
import Task from '../../components/Task'


import tw from 'twrnc'

export default function Index() {
  
  return (
    <View style={tw`flex h-full justify-between`}> 
      <View style={tw`flex flex-col justify-between`}>
      {/* Header of page displaying username and welcome text */}
      <View style={tw`px-8 pt-12 pb-4 rounded-3xl bg-green-600 gap-1`}>
        <Text style={tw`text-white font-bold text-3xl`}>Hey Lucas,</Text>
        <Text style={tw`text-white text-lg`}>Good Morning.</Text>
      </View>
      {/* Safe area view to hold remainder of dashboard components */}
      <SafeAreaView style={tw`flex mx-8 my-8 gap-8`}>
        {/* View to hold community task section */}
        <View>
          <Text style={tw`font-bold text-xl`}>Community Task</Text>

        </View>

        {/* View to hold the daily tasks */}
        <View style={tw`flex gap-4`}>
          <Text style={tw`font-bold text-xl`}>Todays Environment Tasks 🌱</Text>
          <View>
            {/* Map the tasks from dailyTasks sddddddddtate */}
            <Task/>
          </View>
        </View>
        
      </SafeAreaView>
    </View>
    <Navbar/>
    </View>
  );
}
