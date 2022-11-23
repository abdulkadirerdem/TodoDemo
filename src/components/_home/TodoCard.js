import React from "react";

// Date Format
import moment from "moment";

// UI Components
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";

// Icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Logs
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const cardHeader = (headerProps, info, todoStatusHanlde, navigate) => (
  <View {...headerProps} style={[styles.displayFlex, styles.cardHeader]}>
    <Text category="h5">{info.item.title}</Text>
    <View style={[styles.displayFlex, styles.headerButtons]}>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigate("UpdateTodoScreen", info)}
      >
        <MaterialIcons name="edit" size={25} color={"green"} />
      </TouchableOpacity>
      {info.item.todoStatus ? (
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => todoStatusHanlde("passive", info.item.id, info.item)}
        >
          <MaterialIcons name="delete" size={25} color={"#b30000"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => todoStatusHanlde("active", info.item.id, info.item)}
        >
          <MaterialIcons name="replay" size={25} color={"#b30000"} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const cardFooter = (footerProps, info) => (
  <View {...footerProps} style={[styles.displayFlex, styles.cardFooter]}>
    <Text category="c1" style={{ fontWeight: "900" }}>
      {info.item.todoOwnerMail}
    </Text>
    <Text category="c2">
      {moment(info.item.createdDate).format("dddd, MMM DD at HH:mm a")}
    </Text>
  </View>
);

const TodoCard = ({ info, navigate, todoStatusHanlde }) => {
  return (
    <Card
      style={styles.item}
      status="basic"
      header={(headerProps) =>
        cardHeader(headerProps, info, todoStatusHanlde, navigate)
      }
      footer={(footerProps) => cardFooter(footerProps, info)}
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
