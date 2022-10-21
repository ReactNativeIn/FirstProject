import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';

function CustomButton({onPress, title, theme}) {
  const isPrimary = theme === 'primary';

  return (
    <View style={{width: '100%'}}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: isPrimary ? '#ffffff' : '#3493D9',
        }}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#6200ee', 제거
  },
  primaryWrapper: {
    backgroundColor: '#3493D9',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#3493D9',
  },
  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;
