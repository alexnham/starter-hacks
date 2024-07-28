import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import tw from 'twrnc';
import { removeToken, getToken } from './auth';
import { router } from 'expo-router';

const Profile = () => {
    const [token, setToken] = useState('');
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken !== null) {
          setToken(storedToken);
        } else {
          router.replace('/')
        }
      } catch (error) {
        console.error('Failed to load token from storage', error);
      }
    };
    fetchToken();
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
        setUser(data)
      }catch(e) {
        console.log(e)
      }}
      handleLogin()
  }, [token])


    const handleLogout = () => {
        removeToken();
        router.replace('/')

        // Additional logout logic if needed
    };

    return (
        <View style={tw`flex h-full justify-between p-4`}>
            <View>
                <Text style={tw`text-xl font-bold mb-4`}>Profile</Text>
                <Pressable style={tw`bg-blue-500 p-2 rounded`} onPress={handleLogout}>
                    <Text style={tw`text-white text-center`}>Logout</Text>
                </Pressable>
            </View>
            <Navbar />
        </View>
    );
};

export default Profile;
