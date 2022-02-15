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
    let response = await fetch(`${url}/search`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CountryName: country,
        IndicatorName: indicator,
        Year: start,
      }),
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
