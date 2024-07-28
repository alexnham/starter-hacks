import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { saveToken } from './auth';
import tw from 'twrnc';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const sendToLogin = () => {
        router.replace('/')
    }

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user/signup', {
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
        <View style={tw`flex-1 justify-center px-6 bg-white`}>
            <View style={[tw`absolute top-0 left-0 right-0 flex items-center bg-green-600 py-7`, { borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }]}>
                <Text style={tw`text-white font-bold text-3xl`}>Environment App</Text>
            </View>
            <Text style={tw`text-center text-2xl font-bold mb-6`}>Signup</Text>
            <TextInput
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize='none'
            />
            <TextInput
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize='none'
            />
            <TextInput
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
            />
            <TextInput
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize='none'
            />
            <TextInput
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry
            />
            <TextInput
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
                placeholder="Confirm Password"
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
    );
};

export default Signup;
