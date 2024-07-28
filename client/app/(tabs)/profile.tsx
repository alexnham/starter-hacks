import { View, Text, Pressable, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import tw from 'twrnc';
import { removeToken, getToken } from './auth';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

interface OverviewCardProps {
    value: string | number;
    label: string;
    icon?: string;
}
interface ProfileHeader {
    username: string;
    email: string;
    joinDate?: String;
}

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
                const response = await fetch('https://starter-hacks-eeef3ee82963.herokuapp.com/user/getUser', {
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
            } catch (e) {
                console.log(e)
            }
        }
        handleLogin()
    }, [token])


    const handleLogout = () => {
        removeToken();
        router.replace('/')

        // Additional logout logic if needed
    };

    const ProfileHeader: React.FC<ProfileHeader> = ({ username, email, joinDate }) => (
        <View style={tw`bg-green-600 p-4 rounded-b-xl`}>
            <Text style={tw`text-white text-2xl font-bold`}>{username}</Text>
            <Text style={tw`text-white`}>{email} - Joined {joinDate?.split("T")[0]}</Text>
            <Pressable onPress={handleLogout} style={tw`absolute hover:cursor right-4 top-4`}>
                <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M15 3h4.5a2.5 2.5 0 0 1 2.5 2.5V21a2.5 2.5 0 0 1-2.5 2.5H15M4 17l5-5-5-5M9 12H3" />
                </Svg>
            </Pressable>
        </View>
    );

    const OverviewCard: React.FC<OverviewCardProps> = ({ value, label, icon }) => (
        <View style={tw`border border-green-600 rounded-xl p-5 m-1 w-40 h-24 flex flex-col justify-between`}>
            <View style={tw`flex flex-row ml-0`}>
                <Text style={tw`text-3xl mb-1`}>{icon}</Text>
                <Text style={tw`text-xl font-bold text-green-800 mt-1`}>{value}</Text>
            </View >
            <Text style={tw`text-[12px] text-green-800 font-bold pl-4`}>{label}</Text>
        </View>

    );

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Pressable onPress={handleLogout} style={tw`absolute hover:cursor right-4 top-4`}></Pressable>
            {user && <ProfileHeader username={user.firstName + " " + user.lastName} email={user.email} joinDate={user.createdAt} />}
            <View style={tw`p-4`}>
                <Text style={tw`text-xl font-bold mb-4`}>Overview</Text>
                {user &&
                    <View style={tw`flex flex-wrap flex-row justify-between`}>

                        <OverviewCard value={user.streak} label="Day Streak" icon="🔥" />
                        <OverviewCard value={user.points} label="Points" icon="💣" />
                        <OverviewCard value={user.points} label="CO2 Saved" icon="🌲" />
                        <OverviewCard value="1st" label="Globally Ranked" icon="🏆" />

                    </View>
                }
            </View>
            <Navbar></Navbar>
        </SafeAreaView>

    );
}
export default Profile;
