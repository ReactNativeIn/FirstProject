import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemStorage = {
  async get(key) {
    try {
      const rawItem = await AsyncStorage.getItem(key);

      if (!rawItem) {
        // 저장된 데이터가 없으면 사용하지 않음
        console.log('No saved Item');
        return;
      }
      const savedItem = JSON.parse(rawItem);
      return savedItem;
    } catch (e) {
      throw new Error('Failed to load Item');
    }
  },

  async set(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Failed to save Item');
    }
  },
};

export default ItemStorage;
