import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import "./scss/app.scss";

export const SearchContext = React.createContext();

function App() {
    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/cart'
                        element={<Cart />}
                    />
                    <Route
                        path='*'
                        element={<NotFound />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
