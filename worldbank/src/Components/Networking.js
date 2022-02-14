const url = "placeholderURL";

class Networking {
  postLogIn = async (username, password) => {
    let response = await fetch(`${url}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const json = await response.json();

    return json;
  };

  postNewUser = async (username, password, confirm) => {
    let response = await fetch(`${url}/createUser`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
        passwordConfirm: confirm,
      }),
    });
    const json = await response.json();

    return json;
  };
}

export default Networking;
