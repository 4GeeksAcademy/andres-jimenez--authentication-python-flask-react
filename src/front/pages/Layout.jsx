import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { injectContext } from "../store/appContext";
import { Toaster } from "react-hot-toast"; 

import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Private } from "./Private";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Signup />} path="/signup" />
                    <Route element={<Private />} path="/private" />
                    <Route element={<h1>Not found!</h1>} path="*" />
                </Routes>
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

// injectContext wraps Layout and provides context to all components

