import React, { useEffect, useState } from "react";

// RN Components
import { StyleSheet, View } from "react-native";

// UI Kitten Components
import { Text, Input, Button, Spinner } from "@ui-kitten/components";

const url = "https://df71-213-74-98-226.ngrok.io/users";

const LoginScreen = ({ navigation }) => {
  // Credentials
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  // Login States
  const [validationText, setValidationText] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // Datas
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setUsers(res);
          console.log(res);
        })
        .catch((e) => console.log(e));
    };

    getUsers();
  }, []);

  const validationHandle = () => {
    if (mail === "" && password === "") {
      return setValidationText("* Mail ve şifre boş bırakılamaz!");
    }
    if (mail === "") {
      return setValidationText("* Mail boş bırakılamaz!");
    }
    if (password === "") {
      return setValidationText("* Şifre boş bırakılamaz!");
    }
    return setValidationText(
      "* Kullanıcı adı ya da şifresi geçersiz. Lütfen tekrar deneyiniz."
    );
  };

  const signIn = (mail, password) => {
    setIsLogin(true);
    let currentUser = users.filter(
      (user) => user.mail === mail && user.password === password
    );

    if (currentUser.length === 0) {
      setIsLogin(false);
      validationHandle();
    } else {
      navigation.navigate("Home", currentUser[0]);
      setIsLogin(false);
    }
  };

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText} category="h2">
        To-Do Demo
      </Text>
      <View style={styles.loginSection}>
        <Text
          category="h5"
          status="basic"
          style={[styles.marginBottomStyle, styles.loginText]}
        >
          Login
        </Text>
        <Input
          placeholder="Mail"
          value={mail}
          status="basic"
          size="large"
          onChangeText={(nextValue) => setMail(nextValue)}
          style={styles.marginBottomStyle}
        />
        <Input
          placeholder="Password"
          value={password}
          status="basic"
          size="large"
          secureTextEntry
          onChangeText={(nextValue) => setPassword(nextValue)}
          style={styles.marginBottomStyle}
        />
        <Button
          style={styles.button}
          appearance="filled"
          size="medium"
          status="basic"
          accessoryLeft={isLogin && LoadingIndicator}
          onPress={() => {
            signIn(mail, password);
          }}
        >
          <Text>Login</Text>
        </Button>
        <Text status="danger">{validationText}</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    margin: 20,
    marginVertical: 10,
  },
  loginSection: { width: "100%" },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontWeight: "600",
  },
  marginBottomStyle: { marginBottom: 7.5 },
  headerText: { marginBottom: 20 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d7d7d7",
    padding: 50,
  },
});
