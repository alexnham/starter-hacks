import { Text, View, SafeAreaView } from "react-native";
import { Link } from 'expo-router';
import tw from 'twrnc'



const Navbar = () => {
    return (  
        <View style={tw`px-4 py-4 flex flex-row gap-2`}>
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