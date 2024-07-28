import React from "react";
import { View, Text } from 'react-native'
import tw from 'twrnc'

const LeaderboardComp = (props) => {
    return (  
        <View style={tw`h-12 bg-green-600 rounded-md flex flex-row justify-between items-center px-4 `}>
            <View style={tw`flex flex-row gap-2`}>
                {<Text style={tw`font-bold text-lg`}>{props.position}</Text>}
                {<Text style={tw`font-bold text-lg text-white`}>{props.username}</Text>}
            </View>
            
            {<Text style={tw`font-bold text-lg text-white`}>{props.co2}</Text>}
        </View>
    );
}
 
export default LeaderboardComp;