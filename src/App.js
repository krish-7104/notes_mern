import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import mystore from "./redux/store";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <Home />,
    },
  ]);
  return (
    <Provider store={mystore}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
