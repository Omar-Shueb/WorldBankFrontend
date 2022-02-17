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
    let query = `${url}/search`;

    let response = await fetch(query, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country,
        indicator: indicator,
        year: start,
        yearEnd: end,
      }),
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

  /// the function takes the cookie and sends a fetch request to the server endpoint /history with the session cookie as a parameter
  /// an arraay of all searches for the user matching the session cookie is returned
  async getUserHistory() {
    const response = await fetch(`http://localhost:8080/history`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  }

  async patchSession() {
    const response = await fetch("http://localhost:8080/session", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return await json.success;
  }

  async getIndicators(country) {
    const response = await fetch(
      `http://localhost:8080/indicators/${country}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json.success) {
      return json.indicators;
    } else return [];
  }

  async getHistory() {
    try {
      const response = await fetch("http://localhost:8080/history", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return [];
    }
  }
}

export default Networking;
