import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Camera } from 'expo-camera';

import { styles } from './styles';
import { CameraViewProps } from './props';


export default function CameraView({
    cameraRef,
    isRecording,
    onRecord,
    onStopRecording
}: CameraViewProps) {
  return (
    <Camera style={styles.container} ref={cameraRef} autoFocus>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonRecord} onPress={isRecording ? onStopRecording : onRecord}>
                <Text style={styles.buttonText}>{isRecording ? "Stop Recording" : "Start Record"}</Text>
            </TouchableOpacity>
        </View>
    </Camera>
  );
}