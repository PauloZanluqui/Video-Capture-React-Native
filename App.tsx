import { useEffect, useState, useRef } from 'react';
import { Text } from 'react-native';

import { Camera, CameraRecordingOptions } from "expo-camera";
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import CameraView from './src/components/CameraView';
import { VideoPlayer } from './src/components/VideoPlayer';

export default function App() {
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>();

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);

  useEffect(()=>{
    (async()=>{
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status == 'granted');
      setHasMicrophonePermission(microphonePermission.status == 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status == 'granted');
    })();
  },[]);

  if(!hasCameraPermission || !hasMicrophonePermission) return <Text>Não tem permissão de camera ou audio.</Text>

  if(!hasMediaLibraryPermission) return <Text>Não tem acesso nas bibliotecas.</Text>

  const recordVideo = () => {
    setIsRecording(true);

    const options: CameraRecordingOptions = {
      quality: "1080p",
      maxDuration: 60,
      mute: false
    };

    if(cameraRef && cameraRef.current){
      cameraRef.current.recordAsync(options).then((recordedVideo: any) => {
        setVideo(recordedVideo);
        setIsRecording(false);
      });
    }
   
  }

  const stopRecording = () => {
    setIsRecording(false);

    if(cameraRef && cameraRef.current){
      cameraRef.current.stopRecording();
    }
  }

  if(video){
    const shareVideo = () => {
      shareAsync(video.uri).then(()=> {
        setVideo(undefined);
      })
    }

    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(()=> {
        setVideo(undefined);
      })
    }

    return (
      <VideoPlayer 
        video={video}
        onShare={shareVideo}
        onSave={saveVideo}
        onDiscard={() => setVideo(undefined)}
      />
    )
  }

  return (
    <CameraView 
      cameraRef={cameraRef}
      isRecording={isRecording}
      onRecord={recordVideo}
      onStopRecording={stopRecording}
    />
  );
}