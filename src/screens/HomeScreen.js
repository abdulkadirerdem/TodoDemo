import React, { useEffect, useState } from "react";
import AddTodoModal from "../components/_home/AddTodoModal";

// UI Component
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";

// api
import { getTodos } from "../api/todos";

const HomeScreen = (props) => {
  const currentlyUser = props.route.params;
  // add todo
  const [reqIsSuccess, setReqIsSuccess] = useState({});

  const updateTodos = () => {
    getTodos();
    setTitle("");
    setDescription("");
    setReqIsSuccess({});
  };

  useEffect(() => {
    if (reqIsSuccess?.isSuccess) {
      updateTodos();
    }
  }, [reqIsSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>ToDo App</Text>
        {!currentlyUser?.fullAccess && AddTodoModal(currentlyUser)}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },
});
