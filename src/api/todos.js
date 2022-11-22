import uuid from "uuid";
const url = "https://5b12-78-191-60-101.ngrok.io/todos";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getTodos = async () => {
  let todos;
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      todos = res;
    })
    .catch((e) => console.log(e));

  return todos;
};

const addTodo = (title, description, todoOwnerMail) => {
  let status;
  fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id: uuid.v4(),
      title: title,
      description: description,
      todoOwnerMail: todoOwnerMail,
      createdDate: "",
      todoStatus: true,
    }),
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log("todo:", resJson);
      status = {
        isSuccess: true,
        message: "Başarılı.",
      };
    })
    .catch((e) => {
      console.log(e);
      console.log("todo:", resJson);
      status = {
        isSuccess: false,
        message: "Başarısız.",
      };
    });

  return status;
};

const editTodo = (todoId, title, description) => {
  let status;

  fetch(url + `/${todoId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log("updated:", resJson);
      status = {
        isSuccess: true,
        message: "Başarılı.",
      };
    })
    .catch((e) => {
      console.log(e);
      status = {
        isSuccess: false,
        message: "Başarısız.",
      };
    });

  return status;
};

const inactiveTodo = (todoId) => {
  let status;

  fetch(url + `/${todoId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      todoStatus: false,
    }),
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log("updated:", resJson);
      status = {
        isSuccess: true,
        message: "Başarılı.",
      };
    })
    .catch((e) => {
      console.log(e);
      status = {
        isSuccess: false,
        message: "Başarısız.",
      };
    });

  return status;
};

const activeTodo = (todoId) => {
  let status;

  fetch(url + `/${todoId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      todoStatus: true,
    }),
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log("updated:", resJson);
      status = {
        isSuccess: true,
        message: "Başarılı.",
      };
    })
    .catch((e) => {
      console.log(e);
      status = {
        isSuccess: false,
        message: "Başarısız.",
      };
    });

  return status;
};

export { getTodos, addTodo, editTodo, activeTodo, inactiveTodo };
