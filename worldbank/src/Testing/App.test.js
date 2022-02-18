import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import NavBar from "../Components/NavBar/NavBar.js";
import SearchPage from "../Components/SearchPage/SearchPage.js";
import HistoryPage from "../Components/HistoryPage/HistoryPage.js";

describe("Login Page", () => {
  test("App loads login page by default", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(window.location.href).toBe("http://localhost/login");
  });

  test("Login page contains Register button", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole("link");
    for (let button of buttons) {
      expect(button).toBeInTheDocument();
    }

    expect(buttons[0].href).toBe("http://localhost/register");
  });
});

describe("Register Page", () => {
  test("Login page redirects to the register page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const button = screen.getByRole("link");
    // console.log(button);
    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(window.location.href).toBe("http://localhost/register");
  });
});

describe("NavBar", () => {
  test("Navbar contains world bank text", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const text = screen.getByText("WORLD BANK");
    expect(text).toBeInTheDocument();
  });

  test("Navbar contains logout button", async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const logoutBtn = await screen.findByRole("button");
    expect(logoutBtn.innerHTML).toMatch(/Log Out/);
    expect(logoutBtn).toBeInTheDocument();
  });

  test("Navbar has search and history links", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const response = screen.getAllByRole("link");
    for (let res of response) {
      expect(res.innerHTML).toMatch(/(Search)?(History)?/);
    }
  });
});

describe("Search Page", () => {
  test("Search Page contains Nav Bar", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    const text = screen.getByText("WORLD BANK");
    expect(text).toBeInTheDocument();
  });

  test("Search Page Has Year options", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    const response = screen.getAllByRole("combobox");
    expect(response[2].innerHTML).toMatch(/(Start Year)/);
    expect(response[3].innerHTML).toMatch(/(End Year)/);
  });

  test("Search Page Has 4 dropdown boxes", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    const response = screen.getAllByRole("combobox");
    expect(response.length).toBe(4);
  });

  test("Search Page Has Countries And Indicator Labels", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    const country = screen.getByText("Countries:");
    const indicator = screen.getByText("Indicators:");
    expect(country).toBeInTheDocument();
    expect(indicator).toBeInTheDocument();
  });

  test("Search Page Has Countries has 247 drop downs", () => {
    const search = new SearchPage();
    expect(search.countries.length).toBe(247);
  });

  test("Search Page indicators has 1344 drop downs", () => {
    const search = new SearchPage();
    expect(search.state.indicators.length).toBe(1344);
  });
});

describe("History Page", () => {
  test("History Page starts with nothing selected", () => {
    const history = new HistoryPage();
    expect(history.state.currentlySelected).toBe(null);
  });

  test("History page is rendered with a table", () => {
    render(
      <BrowserRouter>
        <HistoryPage />
      </BrowserRouter>
    );
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("History Page contains Nav Bar", () => {
    render(
      <BrowserRouter>
        <HistoryPage />
      </BrowserRouter>
    );
    const text = screen.getByText("WORLD BANK");
    expect(text).toBeInTheDocument();
  });
});
