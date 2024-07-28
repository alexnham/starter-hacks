import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Navbar from '../../components/Navbar';
import Task from '../../components/task';
import { getToken } from './auth';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import tw from 'twrnc';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from "axios"

export default function Index() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<any>(null);
  const [communityTask, setCommunityTask] = useState<any>(null);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken !== null) {
          setToken(storedToken);
        } else {
          router.replace('/');
        }
      } catch (error) {
        console.error('Failed to load token from storage', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const getCommunityTask = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks/getCommunityTask");
        setCommunityTask(response.data);
      } catch (error) {
        console.error('Failed to fetch community task', error);
      }
    };
    getCommunityTask();
  }, []);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/getUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: token
          }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (e) {
        console.log(e);
      }
    };
    handleLogin();
  }, [token]);

  return (
    <View style={tw`flex h-full justify-between`}>
      <View style={tw`flex flex-col justify-between`}>
        {/* Header of page displaying username and welcome text */}
        <View style={tw`px-8 pt-12 pb-4 rounded-3xl bg-green-600 gap-1`}>
          <Text style={tw`text-white font-bold text-3xl`}>Hey {user ? user.username : 'User'},</Text>
          <Text style={tw`text-white text-lg`}>Good Morning.</Text>
          <View style={tw`absolute right-8 top-12 flex flex-row items-center`}>
            {user && <Text style={tw`text-white text-xl mr-2`}>{user.streak}</Text>}
            <Text style={tw`text-white text-xl`}>🔥</Text>
          </View>
        </View>

        {/* Safe area view to hold remainder of dashboard components */}
        <SafeAreaView style={tw`flex mx-8 my-8 gap-8`}>
          {/* View to hold community task section */}
          {communityTask && <View> 
            <Text style={tw`font-bold text-xl`}>{communityTask.name} 👫</Text>
             <View style={tw`flex items-center my-4`}>
              <AnimatedCircularProgress
                size={200}
                width={15}
                fill={50}
                tintColor="#00e08a" 
                backgroundColor="#ddd" >
                {
                  () => (
                    <View>
                      <Text style={tw`text-xl font-bold`}>{communityTask.timesCompleted*communityTask.points}/{communityTask.goal}</Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            </View>
            <TouchableOpacity style={tw`bg-green-500 py-2 px-4 rounded-full`} onPress={() => console.log('Recycle 5 items pressed')}>
              <Text style={tw`text-white text-center`}>{communityTask.userContribution}</Text>
            </TouchableOpacity>
          </View>}

          {/* View to hold the daily tasks */}
          <View style={tw`flex gap-4`}>
            <Text style={tw`font-bold text-xl`}>Today's Environment Tasks 🌱</Text>
            <View>
              {/* Example of a daily task */}
              
              <TouchableOpacity style={tw`flex flex-row justify-between items-center bg-green-500 py-2 px-4 rounded-xl mb-2`} onPress={() => console.log('Recycle 5 items pressed')}>
                <View>
                  <Text style={tw`text-white font-bold`}>Recycle 5 items</Text>
                  <Text style={tw`text-white`}>200g of CO2 ♻️ Saved 🔥</Text>
                </View>
                <View style={tw`bg-white rounded-full h-6 w-6`} />
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex flex-row justify-between items-center bg-green-500 py-2 px-4 rounded-xl mb-2`} onPress={() => console.log('Walk to work pressed')}>
                <View>
                  <Text style={tw`text-white font-bold`}>Walk to work</Text>
                  <Text style={tw`text-white`}>200g of CO2 ♻️ Saved 🔥</Text>
                </View>
                <View style={tw`bg-white rounded-full h-6 w-6`} />
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex flex-row justify-between items-center bg-green-500 py-2 px-4 rounded-xl mb-2`} onPress={() => console.log('Protest Climate Change pressed')}>
                <View>
                  <Text style={tw`text-white font-bold`}>Protest Climate Change</Text>
                  <Text style={tw`text-white`}>200g of CO2 ♻️ Saved 🔥</Text>
                </View>
                <View style={tw`bg-white rounded-full h-6 w-6`} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <Navbar />
    </View>
  );
}
