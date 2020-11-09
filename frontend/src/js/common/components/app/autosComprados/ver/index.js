import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from '../../../../../redux/modules/subasta/subasta';
import LoadMask from '../../../Utils/LoadMask/LoadMask';
import moment from 'moment';
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';

class AdminAutoComprado extends Component {

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leerAutosComprados(params.id);
    }

    render() {

        const { itemAutosComprados, loader } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="card p-4 mb-3">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Detalles de Auto </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            {!!itemAutosComprados && Object.keys(itemAutosComprados).length > 0 && (
                                <div className="d-flex w-100 flex-column">
                                    <div className="flex-1">
                                        <div className="d-flex flex-row">
                                            <div className="flex-1">
                                                <label>
                                                    <strong style={{ fontWeight: "bolder" }}> Fecha y hora de compra: </strong>
                                                </label>
                                                <h5> {moment(itemAutosComprados.fecha_hora).format('DD/MM/YYYY HH:mm A')} </h5>
                                                <label>
                                                    <strong style={{ fontWeight: "bolder" }}> Monto: </strong>
                                                </label>
                                                <h5> <RenderCurrency value ={itemAutosComprados.monto} /> </h5>
                                            </div>
                                            {itemAutosComprados.autoSubastado && (
                                                <div className="flex-1">
                                                    <label> <strong style={{ fontWeight: "bolder"}} > Numero de Subasta: </strong></label>
                                                    <h5> {itemAutosComprados.autoSubastado.subasta.id} </h5>
                                                    <label> <strong style={{ fontWeight: "bolder"}} > Estado: </strong></label>
                                                    <h5> {itemAutosComprados.autoSubastado.subasta.cerrado ? 'Cerrado' : 'Abierto' } </h5>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {itemAutosComprados.autoSubastado && (
                                        <div className="flex-1 px-4 py-2 mt-3" style={{ border:"1px solid #c2c2c2" }} key={itemAutosComprados.id}>
                                            <div className="d-flex flex-column">
                                                <div className="flex-1 d-flex flex-column flex-sm-row">
                                                    <div className="flex-1 d-flex flex-column flex-md-row">
                                                        <div className="flex-1">
                                                            <h4> Auto </h4>
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Tipo:</strong>
                                                            </label>
                                                            <h5> {itemAutosComprados.autoSubastado.auto.tipo} </h5>
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Modelo:</strong>
                                                            </label>
                                                            <h5> {itemAutosComprados.autoSubastado.auto.modelo} </h5>
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Color:</strong>
                                                            </label>
                                                            <h5> {itemAutosComprados.autoSubastado.auto.color} </h5>
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Año:</strong>
                                                            </label>
                                                            <h5> {itemAutosComprados.autoSubastado.auto.año} </h5>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4> Proveedor </h4>
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Nombre: </strong>
                                                            </label>
                                                            <h5> {itemAutosComprados.autoSubastado.provedor.nombre} </h5>
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Direccion: </strong>
                                                            </label>
                                                            <h5> {itemAutosComprados.autoSubastado.provedor.direccion} </h5>
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Telefono: </strong>
                                                            </label>
                                                            <h5> {itemAutosComprados.autoSubastado.provedor.telefono} </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="w-100"/>
                                                <div className="flex-1 d-flex flex-column flex-md-row">
                                                    <div className="flex-1">
                                                        <label> <strong style={{ fontWeight: "bolder"}}> Fotos </strong> </label>
                                                        {itemAutosComprados.autoSubastado.fotos && itemAutosComprados.autoSubastado.fotos.map( (itemFoto, indexFoto, array) => {
                                                            if(indexFoto === 0 || indexFoto % 2 == 0)
                                                                return (
                                                                <div className="d-flex flex-column" key={indexFoto}>
                                                                    <div className="flex-1 d-flex flex-row">
                                                                        {array[indexFoto] && (
                                                                            <div className="flex-1 p-3" style={{ border: "1px dashed #000" }}>
                                                                                <img className="w-100" src={array[indexFoto].foto}/>
                                                                            </div>
                                                                        )}
                                                                        {array[indexFoto + 1] && (
                                                                            <div className="flex-1 p-3" style={{ border: "1px dashed #000" }}>
                                                                                <img className="w-100" src={array[indexFoto + 1].foto}/>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </LoadMask>

                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                    <Link to="/autosComprados"
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

const mstp = (state) => state.subasta;

export default connect(mstp, { ...actions })(AdminAutoComprado);