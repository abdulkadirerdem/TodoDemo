import React, { useEffect, useState } from "react";

// UI Components
import { StyleSheet, View } from "react-native";
import { Button, Card, Input, Modal } from "@ui-kitten/components";

const AddTodoModal = (addTodoHandle) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
            multiline
            textStyle={{ minHeight: 64 }}
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
                let data = {
                  title,
                  description,
                };
                addTodoHandle(data);
                setTitle("");
                setDescription("");
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
});
