import React from 'react'
import { 
    StyleSheet,
    TextInput,
    View,
  } from "react-native";

import Constants from "expo-constants";

const TodoInput = ({añadirtexto, text, sendText}) => {
    
  return (
    <View style={styles.flexRow}>
      <TextInput
        onChangeText={(text) => añadirtexto(text)}
        onSubmitEditing={() => {
          sendText()
        }}
        placeholder="what do you need to do?"
        style={styles.input}
        value={text}
     />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      width:"100%"
    },
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    flexRow: {
      flexDirection: "row",
    },
    input: {
      borderColor: "#4630eb",
      borderRadius: 4,
      borderWidth: 1,
      flex: 1,
      height: 48,
      margin: 16,
      padding: 8,
    },
    listArea: {
      backgroundColor: "#f0f0f0",
      flex: 1,
      paddingTop: 16,
    },
    sectionContainer: {
      marginBottom: 16,
      marginHorizontal: 16,
    },
    sectionHeading: {
      fontSize: 18,
      marginBottom: 8,
    },
  });

export default TodoInput