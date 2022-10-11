import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

function HomeTab({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Entypo name="camera" style={styles.headerLeft} />,
      title: 'Instagram',
      headerTitleAlign: 'center',
      headerRight: () => (
        <MaterialCommunityIcons name="send" style={styles.headerRight} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>HomeTab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeft: {
    paddingLeft: 10,
    fontSize: 24,
    color: 'black',
  },
  headerTitle: {
    fontSize: 20,
  },
  headerRight: {
    paddingLeft: 10,
    fontSize: 24,
    color: 'black',
  },
});

export default HomeTab;
