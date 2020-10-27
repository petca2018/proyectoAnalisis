import React, { Component } from 'react';
import { Link } from "react-router-dom";


class NotFound extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center pt-3" style={{ height: "100vh" }}>
                <div style={{ height: "100%"}} className="d-flex flex-column justify-content-center align-items-center">
                    <h1 style={{ fontSize: "10rem" }}>404</h1>
                    <br/><br/>
                    <h1>Oops!</h1>
                    <h2 className="text-center">Pagina no encontrada</h2>
                    <div className="error-actions">
                        <Link to="/"> Regresar</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
