import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoCameraDeviceError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>No camera device available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
});

export default NoCameraDeviceError;
