import { useState,useEffect } from "react";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


function openDatabase() {
    const db = SQLite.openDatabase("db.db");
    return db;
  }

const db = openDatabase();

const TodoList = ({ done: doneHeading, onPressItem , }) => {
    const [items, setItems] = useState(null);

    useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from itemsD where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
    }, []);

    const heading = doneHeading ? "Completed" : "Todo";

  if (items === null || items.length === 0) {
    return null;
  }
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
        </TouchableOpacity>
      ))}
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
export default TodoList