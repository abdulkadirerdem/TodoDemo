import React from "react";

// UI Components
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "@ui-kitten/components";

// Icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const renderItemHeader = (
  headerProps,
  info,
  editTodoHandle,
  todoStatusHanlde,
  navigate
) => (
  <View {...headerProps} style={[styles.displayFlex, styles.cardHeader]}>
    <Text category="h5">{info.item.title}</Text>
    <View style={[styles.displayFlex, styles.headerButtons]}>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigate("UpdateTodoScreen", info)}
      >
        <MaterialIcons
          name="edit"
          size={25}
          color={"green"}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>
      {info.item.todoStatus ? (
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => todoStatusHanlde("passive", info.item.id, info.item)}
        >
          <MaterialIcons
            name="delete"
            size={25}
            color={"#b30000"}
            style={styles.categoryIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => todoStatusHanlde("active", info.item.id, info.item)}
        >
          <MaterialIcons
            name="replay"
            size={25}
            color={"#b30000"}
            style={styles.categoryIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const renderItemFooter = (footerProps, info) => (
  <View {...footerProps} style={[styles.displayFlex, styles.cardFooter]}>
    <Text category="c1" style={{ fontWeight: "900" }}>
      {info.item.todoOwnerMail}
    </Text>
    <Text category="c2">{info.item.createdDate}</Text>
  </View>
);

const TodoCard = ({ info, navigate, editTodoHandle, todoStatusHanlde }) => {
  return (
    <Card
      style={styles.item}
      status="basic"
      header={(headerProps) =>
        renderItemHeader(
          headerProps,
          info,
          editTodoHandle,
          todoStatusHanlde,
          navigate
        )
      }
      footer={(footerProps) => renderItemFooter(footerProps, info)}
    >
      <Text category="s1">{info.item.description}</Text>
    </Card>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  displayFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardFooter: { padding: 20 },
  button: {
    padding: 6,
  },
  cardHeader: { padding: 20 },
  item: { width: "95%", alignSelf: "center", marginTop: 12.5 },
});
