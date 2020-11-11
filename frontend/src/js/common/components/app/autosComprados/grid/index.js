import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/subasta/subasta';
import GridAutosComprados from "./gridAutosComprados";

class AdminAutoComprado extends Component {


    componentDidMount(){
        this.props.listarAutosComprados();
    }

    render() {

        const { autosComprados, pageAutosComprados, loader, listarAutosComprados } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Autos Comprados </strong> </h3>
                        </div>

                        <GridAutosComprados data={autosComprados} page={pageAutosComprados}
                            loading={loader} onPageChange={listarAutosComprados}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.subasta;

export default connect(mstp, { ...actions })(AdminAutoComprado);
