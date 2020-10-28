import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/clientes/clientes';
import ClienteForm from './clienteForm';
import LoadMask from '../../../Utils/LoadMask/LoadMask';

class AdminClientes extends Component {


    onSubmit = (data) => {
        this.props.crear(data);
    }

    render() {

        const { data, page, loader, listar } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3><strong> Crear cliente </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            <ClienteForm onSubmit={this.onSubmit} creacion/>
                        </LoadMask>

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.clientes;

export default connect(mstp, { ...actions })(AdminClientes);