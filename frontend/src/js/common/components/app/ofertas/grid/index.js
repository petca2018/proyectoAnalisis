import { relativeTimeThreshold } from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/ofertas/ofertas';
import GridOfertas from './gridOfertas';


class AdminOfertas extends Component {


    componentDidMount(){
        this.props.listar();
    }

    adicional = (id,row) => (
        <button type="button" className="btn btn-link p-0" onClick={()=>this.props.editar(true,row)}>
            <i className="material-icons" style={{ color: "#c4183c" }}>edit</i>
        </button>
    )

    render() {

        const { data, page, loader, listar, eliminar } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Ofertas </strong> </h3>
                        </div>

                        <GridOfertas data={data} page={page}
                            loading={loader} onPageChange={listar}
                            eliminar={eliminar}
                            adicional = {this.adicional}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.ofertas;

export default connect(mstp, { ...actions })(AdminOfertas);
