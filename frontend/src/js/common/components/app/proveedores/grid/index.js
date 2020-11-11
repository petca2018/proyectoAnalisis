import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/proveedor/proveedor';
import GridProveedor from './gridProveedor';


class AdminProveedor extends Component {


    componentDidMount(){
        this.props.listar();
    }

    render() {

        const { data, page, loader, listar, eliminar } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Proveedores </strong> </h3>
                        </div>

                        <GridProveedor data={data} page={page}
                            loading={loader} onPageChange={listar}
                            eliminar={eliminar}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.proveedor;

export default connect(mstp, { ...actions })(AdminProveedor);
