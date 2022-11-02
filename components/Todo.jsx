import { useState, useEffect } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import TodoList from "./TodoLIst";
import TodoInput from "./TodoInput";

function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();


export default function Todo() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists itemsD (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  const add = (text) => {
    
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into itemsD (done, value) values (0, ?)", [text]);
        tx.executeSql("select * from itemsD", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  const actualizar = (id) =>{
    db.transaction(
        (tx) => {
          tx.executeSql(`update itemsD set done = 1 where id = ?;`, [
            id,
          ]);
        },
        null,
        forceUpdate
      )
  }

  const eliminar = (id) => {
    db.transaction(
        (tx) => {
          tx.executeSql(`delete from itemsD where id = ?;`, [id]);
        },
        null,
        forceUpdate
      )
  }
  const añadirtexto = (text) => {
    setText(text)
  }
  const sendText = () => {
    add(text);
    setText(null);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Example</Text>

        <>
          <TodoInput añadirtexto={añadirtexto} text={text} sendText={sendText}/>

          
          <ScrollView style={styles.listArea}>
            <TodoList
              key={`forceupdate-todo-${forceUpdateId}`}
              done={false}
              onPressItem={(id) =>
                actualizar(id)
              }
            />
            <TodoList
              done
              key={`forceupdate-done-${forceUpdateId}`}
              onPressItem={(id) =>
                eliminar(id)
              }
            />
          </ScrollView>
        </>

    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
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