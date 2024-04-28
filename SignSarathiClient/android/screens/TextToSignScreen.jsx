import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import Video from 'react-native-video';
import React, {useState} from 'react';
import Voice from '@react-native-community/voice';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {BASE_URL} from '../../config/constants';
import {CurrentRenderContext} from '@react-navigation/native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

const TextToSignScreen = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Voice.onSpeechStart = () =>
  //   (Voice.onSpeechEnd = () =>
  Voice.onSpeechPartialResults = result => setMessage(result.value[0]);
  Voice.onSpeechResults = result => setMessage(result.value[0]);

  const sendPostRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/message`,
        {
          text: message, // Assuming 'message' is a variable containing the text to send
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // You may need to add additional headers depending on your server requirements
          },
        },
      );

      // Check if the request was successful
      if (!response.status === 200) {
        throw new Error('Network response was not ok');
      }
      // Do whatever you want with the video URL, such as setting it in state
      setVideoUrl(null);
      setVideoUrl(`${BASE_URL}/final/output_video.mp4`);
      setMessage('');
    } catch (error) {
      console.error('Error fetching video :', error);
    } finally {
      setIsLoading(false); // Set loading state back to false when response is received
    }
  };
  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      console.log('Voice recording started');
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting voice recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      console.log('Voice recording stopped');
      setIsRecording(false);
      sendMessage();
    } catch (error) {
      console.error('Error stopping voice recording:', error);
    }
  };

  const sendMessage = () => {
    // Implement your logic to send the message
    console.log('Message sent:', message);
    sendPostRequest();
    // Clear input after sending message
  };

  return (
    <View style={styles.rootContainer}>
      {/* {isLoading && <ActivityIndicator size="small" color="#0000ff" />} */}
      {videoUrl ? (
        <Video
          source={{uri: videoUrl}}
          style={styles.videoPlayer}
          resizeMode="cover"
          repeat={true}
          onBuffer={() => {
            <ActivityIndicator size="small" color="#0000ff" />;
          }}
        />
      ) : (
        <ActivityIndicator
          style={styles.videoPlayer}
          size="small"
          color="#0000ff"
        />
      )}

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline={true}
        />
        <TouchableOpacity
          style={styles.micButton}
          onPressIn={startRecording}
          onPressOut={stopRecording}>
          <Icon
            name="microphone"
            size={24}
            color={isRecording ? 'red' : 'black'}
          />
          {/* <Text>Record</Text> */}
        </TouchableOpacity>
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default TextToSignScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'space-between',
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  micButton: {
    padding: 10,
    borderRadius: 20,
  },
  videoPlayer: {
    width: '100%',
    flex: 1,
    marginVertical: 100,
    backgroundColor: 'white',
  },
});
