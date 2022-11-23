import uuid from "uuid";
const url = `https://9ebd-78-191-60-101.ngrok.io/todos`;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json, text/plain, */*",
};

const getTodos = async () => {
  let todos;
  await fetch(url, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      todos = res.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    })
    .catch((e) => console.log(e, "ERROR"));

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

const editTodo = async (todoId, data) => {
  let status;

  await fetch(url + `/${todoId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
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

const inactiveTodo = async (todoId, todo) => {
  let status;
  todo.todoStatus = false;

  await fetch(url + `/${todoId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(todo),
  })
    // .then((res) => res.json())
    .then(() => {
      // console.log("updated:", resJson);
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

const activeTodo = async (todoId, todo) => {
  let status;
  todo.todoStatus = true;

  await fetch(url + `/${todoId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(todo),
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
