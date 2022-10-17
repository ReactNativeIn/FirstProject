import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProfileBody, ProfileButtons} from '../components/ProfileBody';
import ProfileGridview from '../components/ProfileGridview';

const ProfileScreen = () => {
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
