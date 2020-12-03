import React from "react";

const Error404Page: React.FC = (): JSX.Element => {
    return (
        <div className="Error404Page-main-div">
            <h1>Error: 404</h1>
            <p>Sorry, we couldnt find the page you were looking for. Please double check that the room ID is correct.</p>
            <a href="/">Click here to go to the main screen</a>
        </div>
    );
};

export default Error404Page;