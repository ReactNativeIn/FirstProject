import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProfileBody, ProfileButtons} from '../components/ProfileBody';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileGridview from '../components/ProfileGridview';

const ProfileScreen = () => {
  let circuls = [];
  let numberofcircels = 10;

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {index === 0 ? (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderWidth: 1,
              opacity: 0.7,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="plus" style={{fontSize: 40, color: 'black'}} />
          </View>
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: 'black',
              opacity: 0.1,
              marginHorizontal: 5,
            }}></View>
        )}
      </View>,
    );
  }

  return (
    <ScrollView>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <View style={{width: '100%', padding: 10}}>
          <ProfileBody
            name="SadCat"
            accountName="Sad_Cat"
            profileImage={require('../storage/images/userProfile.png')}
            followers="3.6M"
            following="35"
            post="458"
          />
          <ProfileButtons
            id={0}
            name="SadCat"
            accountName="Sad_Cat"
            profileImage={require('../storage/images/userProfile.png')}
          />
        </View>
        <ScrollView>
          <ProfileGridview />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginBottom: 40,
  },
});

export default ProfileScreen;
