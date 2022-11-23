import uuid from "uuid";
const url = "https://dcfd-95-0-140-150.ngrok.io/todos";

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

const addTodo = async (title, description, todoOwnerMail) => {
  let status;
  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id: uuid.v4(),
      title: title,
      description: description,
      todoOwnerMail: todoOwnerMail,
      createdDate: new Date(),
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

const editTodo = async (todoId, title, description) => {
  let status;

  await fetch(url + `/${todoId}`, {
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

const inactiveTodo = async (todoId) => {
  let status;

  await fetch(url + `/${todoId}`, {
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

const activeTodo = async (todoId) => {
  let status;

  await fetch(url + `/${todoId}`, {
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
