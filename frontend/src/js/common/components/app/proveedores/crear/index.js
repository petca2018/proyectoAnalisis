import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/proveedor/proveedor';
import ProveedorForm from './proveedorForm';
import LoadMask from '../../../Utils/LoadMask/LoadMask';

class AdminProveedor extends Component {


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
                            <h3><strong> Crear proveedor </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            <ProveedorForm onSubmit={this.onSubmit} />
                        </LoadMask>

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.proveedor;

export default connect(mstp, { ...actions })(AdminProveedor);