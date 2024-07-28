import { Text, View, SafeAreaView } from "react-native";
import { Link } from 'expo-router';



const Navbar = () => {
    return (  
        <View>
            <Link href="/dashboard">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/leaderboard">Leaderboard</Link>
        </View>
    );
}
 
export default Navbar;