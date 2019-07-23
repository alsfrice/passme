import AsyncStorage from '@react-native-community/async-storage';

const setData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
    console.log('save sucessfully');
  } catch (e) {
    // saving error
    console.log('save error:' + e);
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
    console.log('get successfully');
    return value;
  } catch (e) {
    // error reading value
    console.log('get error:' + e);
  }
};

const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('remove successfully');
  } catch (e) {
    console.log('remove error:' + e);
  }
};

export { setData, getData, removeData };
