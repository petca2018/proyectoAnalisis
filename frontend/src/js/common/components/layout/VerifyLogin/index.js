import React, { Component } from 'react';


class VerifyLogin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    margin: "0",
                    padding: "0",
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                }}>
                    <li style={{
                        listStyle: "none",
                        width: "100%",
                        height: "100%",
                        background: "#fff",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: ".2s",
                        zIndex: "10",
                    }} />
                </ul>
                <p
                    style={{
                        position: "absolute",
                        marginLeft: "calc(50vw - 132px)",
                        marginTop: "calc(50vh - 72px)",
                        fontWeight: "bold",
                        fontSize: "3rem",
                        zIndex: "100",
                        color: "black",
                    }}
                >
                    Cargando...
                </p>
            </div>
        )
    }
}

export default VerifyLogin;
