import React from "react";
import { 
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function Input({style, ...props}) {
  return(
      <TextInput {...props} style={[styles.input, style]}></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e8e8e8',
    width: '90%',
    padding: 20,
    borderRadius: 8, 
  },
})