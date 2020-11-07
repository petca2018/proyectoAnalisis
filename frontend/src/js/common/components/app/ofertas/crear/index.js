import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/ofertas/ofertas';
import CrearOfertaForm from './crearOfertaForm';
import LoadMask from '../../../Utils/LoadMask/LoadMask';


class AdminOfertas extends Component {


    onSubmit = (data) => {
        this.props.crear(data);
    }

    componentDidMount(){
        const { match: { params }, leerAutoSubastado } = this.props;
        leerAutoSubastado(params.id)
    }

    componentWillUnmount(){
        this.props.limpiarItem();
    }

    render() {

        const { data, item, page, loader, setOferta, match: { params } } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3><strong> Realizar una oferta </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            {item && (
                                <CrearOfertaForm onSubmit={this.onSubmit}
                                    item = {item}
                                    setOferta={(data)=>setOferta(false,data)}
                                />
                            )}
                        </LoadMask>

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.ofertas;

export default connect(mstp, { ...actions })(AdminOfertas);