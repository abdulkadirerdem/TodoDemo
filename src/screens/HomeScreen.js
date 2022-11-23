import React, { useEffect, useState } from "react";

// UI Component
import { StyleSheet, View } from "react-native";
import { List, Text } from "@ui-kitten/components";

// api
import { getTodos, addTodo, activeTodo, inactiveTodo } from "../api/todos";

// Custom Components
import AddTodoModal from "../components/_home/AddTodoModal";
import TodoCard from "../components/_home/TodoCard";

const HomeScreen = (props) => {
  const currentlyUser = props.route.params;
  const [todos, setTodos] = useState([]);
  // add todo
  const [reqIsSuccess, setReqIsSuccess] = useState({});

  const [isErrorOccur, setIsErrorOccur] = useState(false);

  const getAllTodos = () => {
    getTodos().then((todos) => {
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
  };

  useEffect(() => {
    getAllTodos();
    const focusHandler = props.navigation.addListener("focus", () => {
      getAllTodos();
    });

    if (todos !== undefined) {
      setIsErrorOccur(false);
    }

    return focusHandler;
  }, [props.navigation, isErrorOccur]);

  useEffect(() => {
    if (todos === undefined) {
      setIsErrorOccur(true);
    }
  }, [todos]);

  const updateTodos = () => {
    getAllTodos();
    setReqIsSuccess({});
  };

  useEffect(() => {
    if (reqIsSuccess?.isSuccess) {
      updateTodos();
    }
    if (todos !== undefined) {
      setIsErrorOccur(false);
    }
  }, [reqIsSuccess]);

  const addTodoHandle = (data) => {
    let { title, description } = data;

    addTodo(title, description, currentlyUser.mail).then((info) =>
      setReqIsSuccess(info)
    );
  };

  const editTodoHandle = (id, data) => {
    editTodo(id, data).then((info) => setReqIsSuccess(info));
  };

  const todoStatusHanlde = (type, id, data) => {
    if (type === "active") {
      activeTodo(id, data).then((info) => setReqIsSuccess(info));
    }
    if (type === "passive") {
      inactiveTodo(id, data).then((info) => setReqIsSuccess(info));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>ToDo App</Text>
        {!currentlyUser?.fullAccess && AddTodoModal(addTodoHandle)}
      </View>
      {todos && (
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={todos}
          renderItem={(data) => (
            <TodoCard
              info={data}
              navigate={props.navigation.navigate}
              todoStatusHanlde={todoStatusHanlde}
            />
          )}
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
