import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/ofertas/ofertas';
import CrearOfertaForm from '../crear/crearOfertaForm';
import LoadMask from '../../../Utils/LoadMask/LoadMask';

class AdminOfertas extends Component {


    onSubmit = (data) => {
        this.props.editar(data);
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leer(params.id);
    }

    render() {

        const { data, page, loader, listar } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Editar Oferta </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            <CrearOfertaForm onSubmit={this.onSubmit} />
                        </LoadMask>

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.ofertas;

export default connect(mstp, { ...actions })(AdminOfertas);