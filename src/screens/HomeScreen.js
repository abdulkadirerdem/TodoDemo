import React, { useEffect, useState } from "react";
import AddTodoModal from "../components/_home/AddTodoModal";

// UI Component
import { StyleSheet, View } from "react-native";
import { List, Text } from "@ui-kitten/components";

// api
import { getTodos } from "../api/todos";
import TodoCard from "../components/_home/TodoCard";

const HomeScreen = (props) => {
  const currentlyUser = props.route.params;
  const [todos, setTodos] = useState([]);
  // add todo
  const [reqIsSuccess, setReqIsSuccess] = useState({});

  useEffect(() => {
    getTodos().then(async (todos) => {
      if (currentlyUser.fullAccess) {
        setTodos(todos);
      } else {
        setTodos(
          todos?.filter(
            (todo) =>
              todo.todoOwnerMail === currentlyUser.mail &&
              todo.todoStatus === true
          )
        );
      }
    });
  }, []);

  const updateTodos = () => {
    getTodos().then((todos) => {
      if (currentlyUser.fullAccess) {
        setTodos(todos);
      } else {
        setTodos(
          todos.filter(
            (todo) =>
              todo.todoOwnerMail === currentlyUser.mail &&
              todo.todoStatus === true
          )
        );
      }
    });
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
      {todos && (
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={todos}
          renderItem={TodoCard}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 0.35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },
});
