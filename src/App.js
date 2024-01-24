import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationBar from "./pages/navigationBar";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Cities from "./pages/Cities";
import Account from "./pages/Account";

const router = createBrowserRouter([
    {
        element: <NavigationBar/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/pricing",
                element: <Pricing/>
            },
            {
                path: "/cities",
                element: <Cities/>
            },
            {
                path: "/account",
                element: <Account/>
            }
        ]
    }
])

function App() {
  return (
    <div className="App" style={{padding:"100px"}}>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
