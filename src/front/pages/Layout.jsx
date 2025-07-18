import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { injectContext } from "../store/appContext";


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
const Layout = () => {
    return (
            <ScrollToTop>
                <Navbar />
                <Outlet />
                <Footer />
            </ScrollToTop>
    );
};

// injectContext wraps Layout and provides context to all components

export default  injectContext (Layout);