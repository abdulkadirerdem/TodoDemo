import React, { useEffect, useState } from "react";

// UI Components
import { StyleSheet, View } from "react-native";
import { Button, Card, Input, Modal } from "@ui-kitten/components";

// api
import { getTodos, addTodo } from "../../api/todos";

const AddTodoModal = (currentlyUser) => {
  const [visible, setVisible] = useState(false);
  const [reqIsSuccess, setReqIsSuccess] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    <>
      <Button
        size="small"
        style={[styles.button]}
        onPress={() => setVisible(true)}
        appearance="filled"
      >
        Add Todo
      </Button>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={styles.modalStyle}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Input
            placeholder="Title"
            value={title}
            status="basic"
            size="medium"
            onChangeText={(nextValue) => setTitle(nextValue)}
            style={styles.marginBottomStyle}
          />
          <Input
            placeholder="Description"
            value={description}
            status="basic"
            size="medium"
            onChangeText={(nextValue) => setDescription(nextValue)}
            style={styles.marginBottomStyle}
          />
          <View style={styles.modalButtons}>
            <Button
              status="danger"
              size="small"
              appearance="outline"
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              status="success"
              size="small"
              appearance="filled"
              onPress={() => {
                addTodo(title, description, currentlyUser.mail).then((info) =>
                  setReqIsSuccess(info)
                );
                setVisible(false);
              }}
            >
              Add New
            </Button>
          </View>
        </Card>
      </Modal>
    </>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalStyle: { width: "70%" },
  marginBottomStyle: { marginBottom: 7.5 },
  button: {},
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
});
