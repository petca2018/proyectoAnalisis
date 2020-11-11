import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from '../../../../../redux/modules/subasta/subasta';
import LoadMask from '../../../Utils/LoadMask/LoadMask';
import moment from 'moment';
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';

class AdminSubasta extends Component {

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leer(params.id);
    }

    render() {

        const { item, loader, cerrarSubasta } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="card p-4 mb-3">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Detalles de Subasta </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            {!!item && Object.keys(item).length > 0 && (
                                <div className="d-flex w-100 flex-column">
                                    <div className="flex-1">
                                        <div className="d-flex flex-row">
                                            <div className="flex-1">
                                                <label>
                                                    <strong style={{ fontWeight: "bolder" }}> Fecha de inicio: </strong>
                                                </label>
                                                <h5> {moment(item.fecha_inicio).format('DD/MM/YYYY HH:mm A')} </h5>
                                                <label>
                                                    <strong style={{ fontWeight: "bolder" }}> Fecha de fin: </strong>
                                                </label>
                                                <h5> {moment(item.fecha_fin).format('DD/MM/YYYY HH:mm A')} </h5>
                                            </div>
                                            <div className="flex-1">
                                                <label> <strong style={{ fontWeight: "bolder"}} > Numero de Subasta: </strong></label>
                                                <h5> {item.id} </h5>
                                                <label> <strong style={{ fontWeight: "bolder"}} > Estado: </strong></label>
                                                <h5> {item.cerrado ? 'Cerrado' : 'Abierto' } </h5>
                                            </div>
                                        </div>
                                    </div>
                                    {item.autoSubastado && item.autoSubastado.map( itemAUto => (
                                        <div className="flex-1 px-4 py-2 mt-3" style={{ border:"1px solid #c2c2c2" }} key={itemAUto.id}>
                                            <div className="d-flex flex-column">
                                                <div className="flex-1 d-flex flex-column flex-sm-row">
                                                    <div className="flex-1 d-flex flex-column flex-md-row">
                                                        <div className="flex-1">
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Precio base:</strong>
                                                            </label>
                                                            <h5> <RenderCurrency value={itemAUto.precio_base} /> </h5>
                                                        </div>
                                                        <div className="flex-1">
                                                            <label>
                                                                <strong style={{ fontWeight: "bolder" }}> Condicion: </strong>
                                                            </label>
                                                            <h5> {itemAUto.condiciones} </h5>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        {itemAUto.provedor && (
                                                            <div className="d-flex flex-column">
                                                                <label className="flex-1">
                                                                    <strong style={{ fontWeight: "bolder" }}> Proveedor: </strong> {itemAUto.provedor.nombre}
                                                                </label>
                                                                <label className="flex-1">
                                                                    <strong style={{ fontWeight: "bolder" }}> Direccion: </strong> {itemAUto.provedor.direccion}
                                                                </label>
                                                                <label className="flex-1">
                                                                    <strong style={{ fontWeight: "bolder" }}> Telefono: </strong> {itemAUto.provedor.telefono}
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <hr className="w-100"/>
                                                <div className="flex-1 d-flex flex-column flex-md-row">
                                                    <div className="flex-1">
                                                        <h6>
                                                            <strong style={{ fontWeight: "bolder" }}> Auto </strong>
                                                        </h6>
                                                        {itemAUto.auto && (
                                                            <div className="flex-1 d-flex flex-column">
                                                                <div className="flex-1 d-flex flex-row">
                                                                    <label className="flex-1">
                                                                        <strong style={{ fontWeight: "bolder" }}> Tipo: </strong> {itemAUto.auto.tipo}
                                                                    </label>
                                                                    <label className="flex-1">
                                                                        <strong style={{ fontWeight: "bolder" }}> Modelo: </strong> {itemAUto.auto.modelo}
                                                                    </label>
                                                                </div>
                                                                <div className="flex-1 d-flex flex-row">
                                                                    <label className="flex-1">
                                                                        <strong style={{ fontWeight: "bolder" }}> Color: </strong> {itemAUto.auto.color}
                                                                    </label>
                                                                    <label className="flex-1">
                                                                        <strong style={{ fontWeight: "bolder" }}> Año: </strong> {itemAUto.auto.año}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <label> <strong style={{ fontWeight: "bolder"}}> Fotos </strong> </label>
                                                        {itemAUto.fotos && itemAUto.fotos.map( (itemFoto, indexFoto, array) => {
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
                                    ))}
                                </div>
                            )}
                        </LoadMask>

                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                    <Link to="/subasta"
                                        className="btn btn-secondary m-1"
                                    >
                                        <i className="fa fa-arrow-left"></i>&nbsp;
                                        Regresar
                                    </Link>
                                    {item && Object.keys(item).length > 0 && item.cerrado === false && (
                                        <button type="submit"
                                            className="btn btn-danger m-1"
                                            onClick={()=>cerrarSubasta(item.id)}
                                        >
                                            <i className="fa fa-lock"></i>&nbsp;
                                            Cerrar subasta
                                        </button>
                                    )}
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

export default connect(mstp, { ...actions })(AdminSubasta);