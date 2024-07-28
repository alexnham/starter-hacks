import { View, Text } from 'react-native'
import React from 'react';
import Navbar from '../../components/Navbar';
import tw from 'twrnc'


const Leaderboard = () => {
    return (  
        <View style={tw`flex h-full justify-between`}> 
            <View>
                <Text> leaderboard </Text>
            </View>
            <Navbar/>
        </View>
    );
}
 
export default Leaderboard;