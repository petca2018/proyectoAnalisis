import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from '../../../../../redux/modules/autos/autos';
import LoadMask from '../../../Utils/LoadMask/LoadMask';

class AdminAutos extends Component {

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
                            <h3> <strong> Detalles de auto </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            {!!item && Object.keys(item).length > 0 && (
                                <div className="d-flex w-100 flex-column flex-md-row">
                                    <div className="flex-1">
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Tipo: </strong>
                                        </label>
                                        <h5> {item.tipo} </h5>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Modelo: </strong>
                                        </label>
                                        <h5> {item.modelo} </h5>
                                    </div>
                                    <div className="flex-1">
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Año: </strong>
                                        </label>
                                        <h5> {item.año} </h5>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Color: </strong>
                                        </label>
                                        <h5> {item.color} </h5>
                                    </div>
                                </div>
                            )}
                        </LoadMask>

                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                    <Link to="/auto"
                                        className="btn btn-secondary m-1"
                                    >
                                        <i class="fa fa-arrow-left"></i>&nbsp;
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

const mstp = (state) => state.autos;

export default connect(mstp, { ...actions })(AdminAutos);