import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token:any) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    // saving error
  }
};


const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token !== null) {
        return token;
      }
    } catch (e) {
      // read error
    }
    return null;
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@auth_token');
    } catch (e) {
      // remove error
      console.error('Error removing token:', e);
    }
  };
  
  export { saveToken, getToken, removeToken }