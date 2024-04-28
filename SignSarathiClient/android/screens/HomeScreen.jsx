import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignToTextScreen')}>
        <Text style={styles.buttonText}>Detect Sign Language</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TextToSignScreen')}>
        <Text style={styles.buttonText}>Generate Sign Language</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD700', // Golden color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
