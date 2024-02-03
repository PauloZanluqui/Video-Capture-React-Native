import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center'
  },
  buttonRecord: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "black",
    fontSize: 18
  }
});