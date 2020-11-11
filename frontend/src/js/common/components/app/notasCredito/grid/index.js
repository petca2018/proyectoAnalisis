import { relativeTimeThreshold } from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/cuenta/profile';
import GridNotas from './gridNotas';


class AdminNotas extends Component {


    componentDidMount(){
        this.props.listarNotasCredito();
    }

    render() {

        const { dataNotas, pageNotasCredito, loader, listarNotasCredito } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Notas de credito </strong> </h3>
                        </div>

                        <GridNotas data={dataNotas} page={pageNotasCredito}
                            loading={loader} onPageChange={listarNotasCredito}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.profile;

export default connect(mstp, { ...actions })(AdminNotas);
