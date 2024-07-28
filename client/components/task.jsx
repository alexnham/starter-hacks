import { Text, View, SafeAreaView } from "react-native";
import tw from 'twrnc'


const Task = () => {
    return (  
        <View style={tw`px-4 py-4 flex flex-row justify-between bg-green-600 text-white rounded-lg`}>
            <View style={tw`flex flex-col text-white`}>
                <View style={tw`text-lg`}>
                    <Text style={tw`text-white text-lg font-bold`}>Task</Text>
                </View>
                <View style={tw``}>
                    <Text style={tw`text-white text-md`}>Desc</Text>   
                </View>
                
            </View>
            <View>
                <Text style={tw`text-white`}>Button</Text>
            </View>
        </View>
    );
}
 
export default Task;