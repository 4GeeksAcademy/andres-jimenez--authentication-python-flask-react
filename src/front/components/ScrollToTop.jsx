import React from "react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// This component allows the scroll to go to the beginning when changing the view,
// otherwise it would remain in the position of the previous view. 
// Investigate more about this React behavior :D 

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {

        }
    }
    render() {
        return this.props.children;
    }
}


export default ScrollToTop;

ScrollToTop.propTypes = {
    location: PropTypes.object,
    children: PropTypes.any
};