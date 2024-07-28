import { Text, View, SafeAreaView } from "react-native";
import { Link } from 'expo-router';
import tw from 'twrnc'





const Navbar = () => {
    return (  
        <View style={tw`m-0 w-full text-white py-8 flex flex-row bg-green-600 justify-between items-center`}>
            <View>
                <Link href="/dashboard">Home</Link>
            
            </View>
            <View>
                <Link href="/profile">Profile</Link>
            </View>
            <View>
                <Link href="/leaderboard">Leaderboard</Link>
            </View>
        </View>
    );
}
 
export default Navbar;