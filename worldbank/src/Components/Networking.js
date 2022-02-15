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

  getDistinctIndicators = async () => {
    let response = await fetch(`${url}/indicators`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };
}

export default Networking;
