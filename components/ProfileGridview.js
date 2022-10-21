import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const ProfileGridview = props => {
  const searchData = [
    {
      id: 0,
      images: [
        require('../storage/images/post1.jpg'),
        require('../storage/images/post7.jpg'),
        require('../storage/images/post8.jpg'),
        require('../storage/images/post9.jpg'),
        require('../storage/images/post10.jpg'),
        require('../storage/images/post11.jpg'),
        require('../storage/images/post12.jpg'),
        require('../storage/images/post13.jpg'),
        require('../storage/images/post14.jpg'),
        require('../storage/images/post15.jpg'),
      ],
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.wrapper}>
        {item.images.map((imageData, imgIndex) => {
          return (
            <TouchableOpacity key={imgIndex} style={styles.imageWrapper}>
              <Image source={imageData} style={styles.image} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <FlatList
      data={searchData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageWrapper: {
    paddingBottom: 2,
    width: '33%',
  },
  image: {
    width: '100%',
    height: 150,
  },
});

export default ProfileGridview;
