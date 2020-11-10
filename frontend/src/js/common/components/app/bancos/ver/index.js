import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from '../../../../../redux/modules/bancos/bancos';
import LoadMask from '../../../Utils/LoadMask/LoadMask';

class AdminBanco extends Component {

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
                            <h3> <strong> Detalles de banco </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            {!!item && Object.keys(item).length > 0 && (
                                <div className="d-flex w-100 flex-column flex-md-row">
                                    <div className="flex-1">
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Nombre: </strong>
                                        </label>
                                        <h5> {item.nombre} </h5>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Dirección: </strong>
                                        </label>
                                        <h5> {item.direccion} </h5>
                                    </div>
                                    <div className="flex-1">
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Teléfono: </strong>
                                        </label>
                                        <h5> {item.telefono} </h5>
                                    </div>
                                </div>
                            )}
                        </LoadMask>

                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                    <Link to="/bancos"
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

const mstp = (state) => state.bancos;

export default connect(mstp, { ...actions })(AdminBanco);