import { View, Text, SafeAreaView } from 'react-native'
import React from 'react';
import Navbar from '../../components/Navbar';
import LeaderboardComp from '../../components/LeaderboardComp'
import tw from 'twrnc'

import { useEffect } from 'react';

const Leaderboard = () => {

    useEffect(() => {
        
    })


    return (  
        <View style={tw`flex h-full gap-8`}> 
            {/* Header of page displaying username and welcome text */}
            <View style={tw`px-8 py-8 rounded-3xl bg-green-600 gap-1`}>
                <Text style={tw`text-white font-bold text-3xl`}>Leaderboards</Text>
            </View>
            <SafeAreaView style={tw`mx-4`}>
                <Text style={tw`font-bold text-lg`}>Top CO2 Savers:</Text>
                <View style={tw`flex gap-3`}>
                    <LeaderboardComp position="🥇" username={'John'} co2={'18920'}/>
                    <LeaderboardComp position="🥈" username={'Sarah'} co2={'17923'}/>
                    <LeaderboardComp position="🥉" username={'Fred'} co2={'16783'}/>
                    <LeaderboardComp position="" username={'Samual'} co2={'11403'}/>
                    <LeaderboardComp position="" username={'Emma'} co2={'9852'}/>
                    <LeaderboardComp position="" username={'Joe'} co2={'8472'}/>
                </View>
            </SafeAreaView>
            <Navbar/>
        </View>
    );
}
 
export default Leaderboard;