const url = "https://5b12-78-191-60-101.ngrok.io/users";

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
