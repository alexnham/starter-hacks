import { View, Text } from 'react-native'
import React from 'react';
import Navbar from '../../components/Navbar';
import tw from 'twrnc'


const Profile = () => {
    return (  
        <View style={tw`flex h-full justify-between`}> 
            <View>
                <Text> profile </Text>
            </View>
            <Navbar/>
        </View>
    );
}
 
export default Profile;