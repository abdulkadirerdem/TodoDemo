const url = "https://d731-95-0-140-150.ngrok.io/users";

const getUsers = async () => {
  let users;
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      users = res;
    })
    .catch((e) => console.log(e));

  return users;
};

export { getUsers };
