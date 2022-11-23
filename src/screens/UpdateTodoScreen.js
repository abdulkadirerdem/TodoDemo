import React, { useState, useEffect } from "react";

// UI Components
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Card, Input, Modal, Text } from "@ui-kitten/components";

// Icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Api
import { editTodo } from "../api/todos";

const UpdateTodoScreen = (props) => {
  const [newTitle, setNewTitle] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [reqIsSuccess, setReqIsSuccess] = useState({});
  const [visible, setVisible] = useState(false);

  const editTodoHandle = () => {
    let updatedTodo = props.route.params.item;

    if (newTitle !== null) {
      updatedTodo.title = newTitle;
    }
    if (newDescription !== null) {
      updatedTodo.description = newDescription;
    }

    editTodo(updatedTodo.id, updatedTodo).then((info) => {
      setReqIsSuccess(info);
    });
  };

  useEffect(() => {
    if (reqIsSuccess?.isSuccess) {
      setVisible(true);
      setNewTitle(null);
      setNewDescription(null);
    }
  }, [reqIsSuccess]);

  const UpdateModal = () => {
    return (
      <Modal
        backdropStyle={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        style={{ width: "90%" }}
        visible={visible}
      >
        <Card disabled={true}>
          <Text category="h4">Successful!</Text>
          <Text style={{ marginBottom: 20 }} category="s1">
            Your transaction has been successfully updated.
          </Text>
          <Button
            onPress={() => {
              setVisible(false);
              props.navigation.goBack();
            }}
          >
            Go Back
          </Button>
        </Card>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>ToDo App</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color={"black"} />
          </TouchableOpacity>
          <Text category="h6">Update Your To-Do</Text>
        </View>

        <Input
          placeholder="New Title"
          value={newTitle}
          status="basic"
          size="large"
          onChangeText={(nextValue) => setNewTitle(nextValue)}
          style={styles.marginBottomStyle}
        />
        <Input
          placeholder="New Description"
          multiline
          textStyle={{ minHeight: 64 }}
          value={newDescription}
          status="basic"
          size="large"
          onChangeText={(nextValue) => setNewDescription(nextValue)}
          style={styles.marginBottomStyle}
        />
        <Button
          style={{ marginTop: 20 }}
          status="success"
          appearance="filled"
          size="medium"
          onPress={() => {
            editTodoHandle();
          }}
        >
          Update
        </Button>
      </View>
      <UpdateModal />
    </View>
  );
};

export default UpdateTodoScreen;

const styles = StyleSheet.create({
  marginBottomStyle: { marginBottom: 7.5 },
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
