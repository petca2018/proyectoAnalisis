import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut, user } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link " activeClassName={'active'}>
                                <i className="fa fa-home"></i>
                                <span>Inicio</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/ofertas" exact className="nav-link " activeClassName={'active'}>
                                <i className="fa fa-money"></i>
                                <span>Ofertas</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/autosComprados" exact className="nav-link " activeClassName={'active'}>
                                <i className="fa fa-car"></i>
                                <span>Autos Comprados</span>
                            </NavLink>
                        </li>
                        {user.is_staff && (
                            <li className="nav-item">
                                <NavLink to="/subasta" exact className="nav-link " activeClassName={'active'}>
                                    <i className="fa fa-gavel"></i>
                                    <span>Subastas</span>
                                </NavLink>
                            </li>
                        )}
                        {user.is_staff && (
                            <li className="nav-item">
                                <NavLink to="/auto" exact className="nav-link " activeClassName={'active'}>
                                    <i className="fa fa-car"></i>
                                    <span>Autos</span>
                                </NavLink>
                            </li>
                        )}
                        {user.is_staff && (
                            <li className="nav-item">
                                <NavLink to="/cliente" exact className="nav-link " activeClassName={'active'}>
                                    <i className="fa fa-users"></i>
                                    <span>Clientes</span>
                                </NavLink>
                            </li>
                        )}
                        {user.is_staff && (
                            <li className="nav-item">
                                <NavLink to="/proveedor" exact className="nav-link " activeClassName={'active'}>
                                <i className="fa fa-user-plus"></i>
                                    <span>Proveedores</span>
                                </NavLink>
                            </li>
                        )}
                        {user.is_staff && (
                            <li className="nav-item">
                                <NavLink to="/bancos" exact className="nav-link " activeClassName={'active'}>
                                <i className="fa fa-university"></i>
                                    <span>Bancos</span>
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;
