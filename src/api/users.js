const url = `https://9ebd-78-191-60-101.ngrok.io/users`;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json, text/plain, */*",
};

const getUsers = async () => {
  let users;
  await fetch(url, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      users = res;
    })
    .catch((e) => console.log(e));

  return users;
};

export { getUsers };
