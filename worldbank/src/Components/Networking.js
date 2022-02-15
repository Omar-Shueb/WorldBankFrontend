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

  postSearch = async (country, indicator, start) => {
    let query = `${url}/search?country=${country}`;

    if (start) {
      query += `&year=${start}`;
    }

    if (indicator) {
      query += `&indicator=${indicator}`;
    }

    let response = await fetch(query, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    return json;
  };

  async getSession() {
    const response = await fetch("http://localhost:8080/session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return await json.success;
  }
}

export default Networking;
