import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Camera,
  getCameraDevice,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {mpDetect} from '../../MpHolisticPlugin';
import NoCameraDeviceError from '../../components/NoCameraDeviceError';

const SignToTextScreen = () => {
  const device = useCameraDevice('back');

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const landmarks = mpDetect(frame);
    console.log(landmarks);
  }, []);

  if (device == null) return <NoCameraDeviceError />;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      //   frameProcessor={frameProcessor}
    />
  );
};

export default SignToTextScreen;

const styles = StyleSheet.create({});
