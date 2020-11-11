import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/subasta/subasta';
import GridSubasta from "./gridSubasta";

class AdminSubasta extends Component {


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
                            <h3> <strong> Subastas </strong> </h3>
                        </div>

                        <GridSubasta data={data} page={page}
                            loading={loader} onPageChange={listar}
                            eliminar={eliminar}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.subasta;

export default connect(mstp, { ...actions })(AdminSubasta);
