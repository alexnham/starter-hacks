import { Text, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
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
  const [userTasks, setUserTask] = useState<any>(null)

  const getCommunityTask = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks/getCommunityTask");
      setCommunityTask(response.data);
    } catch (error) {
      console.error('Failed to fetch community task', error);
    }
  };

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

  useEffect(() => {
    const settingUserTask = async () => {
      try {
        const userTaskResponse = await axios.post("http://localhost:3000/user/getUserDailyTasks", { username: user.username });
        setUserTask(userTaskResponse.data);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    if (user && user.username) {
      settingUserTask();
    }
  }, [user]);
  const completeCommunityTask = () => {
    Alert.alert(
      'Complete Task',
      `Complete "${communityTask.name}"?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await axios.post('http://localhost:3000/tasks/completeUserCommunityTask', { username: user.username });
              const userResponse = await axios.post("http://localhost:3000/user/getUser", { username: token });
              setUser(userResponse.data);
              console.log(user)
              getCommunityTask()
            } catch (error) {
              console.error("Error completing task or fetching user data:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }


  const completeDailyTask = (id: any, name: any) => {
    Alert.alert(
      'Complete Task',
      `Complete ${name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await axios.post('http://localhost:3000/tasks/completeUserDailyTask', { username: user.username, id: id });
              const userResponse = await axios.post("http://localhost:3000/user/getUser", { username: token });
              setUser(userResponse.data);
              console.log(user)
            } catch (error) {
              console.error("Error completing task or fetching user data:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );

  }

  return (
    <View style={tw`flex h-full justify-between`}>
      <View style={tw`flex flex-col justify-between`}>
        {/* Header of page displaying username and welcome text */}
        <View style={tw`px-8 pt-12 pb-4 rounded-3xl bg-green-600 gap-1`}>
          <Text style={tw`text-white font-bold text-3xl`}>Hey {user ? user.firstName : 'User'},</Text>
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
                fill={communityTask.timesCompleted * communityTask.points / communityTask.goal * 100}
                tintColor="#00e08a"
                backgroundColor="#ddd" >
                {
                  () => (
                    <View>
                      <Text style={tw`text-xl font-bold`}>{communityTask.timesCompleted * communityTask.points}/{communityTask.goal}</Text>
                      <Text style={tw`text-sm font-bold text-center`}>g of CO2</Text>

                    </View>
                  )
                }
              </AnimatedCircularProgress>
            </View>
            {user && (
              <TouchableOpacity
              style={tw`flex flex-row justify-between items-center ${user.communityTask === 0 ? "bg-white" : "bg-green-800" } py-2 px-4 rounded-full shadow mb-2`} 
              onPress={() => user.communityTask === 0 ? completeCommunityTask() : null}
                disabled={user.communityTask === 1}
              >
                {user.communityTask === 0 && (
                  <Text style={tw`text-green-800 font-bold`}>
                    Contribute: {communityTask.userContribution} g CO2
                  </Text>
                )}
                {user.communityTask === 1 && (
                  <Text style={tw`text-white text-center font-bold`}>
                    Daily Community Quest Completed 🎉
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>}

          {/* View to hold the daily tasks */}
          <View style={tw`flex gap-4`}>
            <Text style={tw`font-bold text-xl`}>Today's Environment Tasks 🌱</Text>
            <View>
              {/* Example of a daily task */}
              {user && userTasks && userTasks.map((taskItem: any, index: number) => (
                <TouchableOpacity
                  key={taskItem._id}
                  style={tw`flex flex-row justify-between items-center ${user.tasks[index].status === "Incomplete" ? "bg-white" : "bg-green-800" } py-2 px-4 rounded-full shadow mb-2`} 
                  onPress={() => user.tasks[index].status === "Incomplete" ? completeDailyTask(taskItem._id, taskItem.name) : void (0)
                  }
                >
                  <View style={tw`max-w-10/12`}>
                    <Text style={tw`${user.tasks[index].status === "Incomplete" ? "text-green-800" : "text-white"} font-bold`} numberOfLines={1} ellipsizeMode="tail">
                      {taskItem.name}
                    </Text>
                    <Text style={tw`${user.tasks[index].status === "Incomplete" ? "text-green-800" : "text-white"} text-xs`} numberOfLines={1} ellipsizeMode="tail">
                      {taskItem.description} ♻️ {user.tasks[index].status === "Complete" && "Saved 🔥"}
                    </Text>
                  </View>
                  {user.tasks[index].status === "Incomplete" && <View style={tw`bg-green-800 rounded-full h-6 w-6`} />}
                  {user.tasks[index].status === "Complete" && <View style={tw`bg-white rounded-full h-6 w-6`} />}


                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </View>
      <Navbar />
    </View>
  );
}
