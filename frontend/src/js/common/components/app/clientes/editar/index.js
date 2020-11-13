import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/clientes/clientes';
import ClienteForm from '../crear/clienteForm';
import LoadMask from '../../../Utils/LoadMask/LoadMask';

class AdminClientes extends Component {


    onSubmit = (data) => {
        this.props.editar(data);
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leer(params.id);
    }

    render() {

        const { data, page, loader, listar, getBancos } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Editar Cliente </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            <ClienteForm onSubmit={this.onSubmit} getBancos={getBancos}/>
                        </LoadMask>

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.clientes;

export default connect(mstp, { ...actions })(AdminClientes);