import React, { Component } from 'react';
import LoadMask from '../Utils/LoadMask/LoadMask';
import { connect } from "react-redux";
import { actions } from '../../../redux/modules/subasta/subasta';
import Tarjeta from './tarjeta';


class Inicio extends Component {

    componentDidMount(){
        this.props.getSubastas();
    }

    render() {

        const { loader = false, subastas, crearOferta } = this.props;

        return (
            <div className="page-header py-4 no-gutters row">
                <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12">
                    <h3 className="page-title">Inicio</h3>
                        <LoadMask loading={loader} light blur>
                            <div className="d-flex justify-content-start align-items-start flex-column">
                                {subastas && subastas.results && subastas.results.map( itemSubasta => {
                                    return itemSubasta.autoSubastado.map(itemAuto => (
                                        <div className="flex-1 m-2" key = { itemAuto.id }>
                                            <Tarjeta
                                                alt={`${itemAuto.auto.tipo} - ${itemAuto.auto.modelo}`}
                                                titulo={`${itemAuto.auto.tipo} - ${itemAuto.auto.año}`}
                                                fotos={itemAuto.fotos}
                                                id={itemAuto.id}
                                                subtitulo={`Modelo: ${itemAuto.auto.modelo}, Color: ${itemAuto.auto.color}`}
                                                texto={itemAuto.descripcion}
                                                boton="Ofertar"
                                                />
                                        </div>
                                    ))}
                                )}
                            </div>
                        </LoadMask>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.subasta;

export default connect(mstp, { ...actions })(Inicio);