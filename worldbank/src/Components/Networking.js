const url = "http://localhost:8080";

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

  postNewUser = async (username, password) => {
    let response = await fetch(`${url}/createaccount`, {
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

  postSearch = async (country, indicator, start, end) => {
    let response = await fetch(`${url}/createaccount`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country,
        indicator: indicator,
        start: start,
        end: end,
      }),
    });
    const json = await response.json();

    return json;
  };
}

export default Networking;
