import {VisionCameraProxy, Frame} from 'react-native-vision-camera';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('mpDetect');

export function mpDetect(frame) {
  'worklet';
  if (plugin == null) {
    throw new Error('Failed to load Frame Processor Plugin!');
  }
  return plugin.call(frame);
}
