import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from '../../../../../redux/modules/cuenta/profile';
import LoadMask from '../../../Utils/LoadMask/LoadMask';
import { RenderCurrency } from "../../../Utils/renderField/renderReadField";
import moment from 'moment';


class AdminNotas extends Component {

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leerNotasCredito(params.id);
    }

    render() {

        const { itemNotas, loader } = this.props;
        const item = itemNotas;
        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="card p-4 mb-3">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Detalles de la Nota </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            {!!item && Object.keys(item).length > 0 && (
                                <div className="d-flex w-100 flex-column flex-md-row">
                                    <div className="flex-1">
                                        <small>
                                            <strong style={{ fontWeight: "bolder" }}> Fecha y hora: </strong>
                                        </small>
                                        <h5> {moment(item.fecha_hora).format('DD/MM/YYYY HH:mm A')} </h5>
                                        <small>
                                            <strong style={{ fontWeight: "bolder" }}> Monto: </strong>
                                        </small>
                                        <h5> <RenderCurrency value = {item.monto} /> </h5>
                                    </div>
                                    <div className="flex-1">
                                        <small> Tarjeta: </small>
                                            <h5> {item.profile.tarjetas[0].banco.nombre} - {item.profile.tarjetas[0].numero} </h5>
                                        <small> Concepto: </small>
                                            <h5> {`${item.concepto}`} </h5>
                                    </div>
                                </div>
                            )}
                        </LoadMask>

                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                    <Link to="/notas_credito"
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

const mstp = (state) => state.profile;

export default connect(mstp, { ...actions })(AdminNotas);