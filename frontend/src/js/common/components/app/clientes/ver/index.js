import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from '../../../../../redux/modules/clientes/clientes';
import LoadMask from '../../../Utils/LoadMask/LoadMask';

class AdminCliente extends Component {

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leer(params.id);
    }

    render() {

        const { item, loader } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="card p-4 mb-3">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Detalles de Cliente </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            {!!item && Object.keys(item).length > 0 && (
                                <div className="d-flex w-100 flex-column flex-md-row">
                                    <div className="flex-1">
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Usuario: </strong>
                                        </label>
                                        <h5> {item.username} </h5>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Nombre: </strong>
                                        </label>
                                        <h5> {item.firt_name} {item.last_name} </h5>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Correo: </strong>
                                        </label>
                                        <h5> {item.email} </h5>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Tipo: </strong>
                                        </label>
                                        <h5> {item.is_staff ? 'Administrador' : 'Cliente'} </h5>
                                    </div>
                                    {item.profile && (
                                        <div className="flex-1">
                                            <h5 style={{ fontWeight: "bolder" }}> Profile </h5>
                                            <hr className="w-100" style={{ border: "1px solid #c4183c"}}/>
                                            <label>
                                                <strong style={{ fontWeight: "bolder" }}> Teléfono: </strong>
                                            </label>
                                            <h5> {item.profile.phone} </h5>
                                            <label>
                                                <strong style={{ fontWeight: "bolder" }}> Direccion: </strong>
                                            </label>
                                            <h5> {item.profile.address} </h5>
                                            <label>
                                                <strong style={{ fontWeight: "bolder" }}> Genero: </strong>
                                            </label>
                                            <h5> {item.profile.gender ? 'Masculino' : 'Femenino'} </h5>
                                        </div>
                                    )}
                                </div>
                            )}
                        </LoadMask>

                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                    <Link to="/cliente"
                                        className="btn btn-secondary m-1"
                                    >
                                        <i className="fa fa-arrow-left"></i>&nbsp;
                                        Regresar
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.clientes;

export default connect(mstp, { ...actions })(AdminCliente);