import { View, Text, TextInput, Pressable, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { saveToken } from './auth';
import tw from 'twrnc';
import axios from 'axios';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const sendToLogin = () => {
        router.replace('/');
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const response = await fetch('https://starter-hacks-eeef3ee82963.herokuapp.com/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Signup successful');
                await saveToken(data.username);

                const response = await axios.post('https://starter-hacks-eeef3ee82963.herokuapp.com/user/createUserDailyTasks', { username: username });
                console.log(response.data);
                router.replace('/dashboard');
            } else {
                Alert.alert('Error', data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to signup');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={tw`flex-1 bg-white`}>
                <ScrollView contentContainerStyle={tw`flex-1 justify-center px-6`}>
                    <View style={[tw`absolute top-0 left-0 right-0 flex items-center bg-green-600 py-7`, { borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }]}>
                        <Text style={tw`text-white font-bold text-3xl`}>Environment App</Text>
                    </View>
                    <View style={tw`flex-1 justify-center`}>
                        <Text style={tw`text-center text-2xl font-bold mb-6 text-black`}>Signup</Text>
                        <TextInput
                            style={tw`border border-gray-300 rounded-lg p-2 mb-4 text-black`}
                            placeholder="First Name"
                            placeholderTextColor="#888"
                            value={firstName}
                            onChangeText={setFirstName}
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={tw`border border-gray-300 rounded-lg p-2 mb-4 text-black`}
                            placeholder="Last Name"
                            placeholderTextColor="#888"
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={tw`border border-gray-300 rounded-lg p-2 mb-4 text-black`}
                            placeholder="Username"
                            placeholderTextColor="#888"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={tw`border border-gray-300 rounded-lg p-2 mb-4 text-black`}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={tw`border border-gray-300 rounded-lg p-2 mb-4 text-black`}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize='none'
                            secureTextEntry
                        />
                        <TextInput
                            style={tw`border border-gray-300 rounded-lg p-2 mb-4 text-black`}
                            placeholder="Confirm Password"
                            placeholderTextColor="#888"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            autoCapitalize='none'
                            secureTextEntry
                        />
                        <Pressable style={tw`bg-green-600 p-3 rounded-lg mb-4`} onPress={handleSignup}>
                            <Text style={tw`text-white text-center font-semibold text-lg`}>Sign Up</Text>
                        </Pressable>
                        <Pressable onPress={sendToLogin}>
                            <Text style={tw`text-center text-blue-500 text-lg`}>Already have an account? Login</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Signup;
