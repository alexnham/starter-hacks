import { View, Text } from "react-native";
import tw from 'twrnc';

const Task = () => {
    return (  
        <View style={tw`flex flex-row justify-between bg-green-600 rounded-lg h-16 py-2 px-4`}>
            <View>
                <Text style={tw`text-white font-bold text-xl`}>Recycle 5 cans</Text>
                <Text style={tw`text-white text-sm`}>200g of CO2 Saved🔥</Text>
            </View>
            <View style={tw`bg-white w-12 h-12 rounded-lg`}>

            </View>
            
        </View>
    );
}
 
export default Task;