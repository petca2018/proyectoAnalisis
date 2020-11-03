import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/subasta/subasta';
import SubastaForm from './subastaForm';
import LoadMask from '../../../Utils/LoadMask/LoadMask';
import moment from 'moment';

class AdminSubasta extends Component {

    state = {
        autoSubastado: []
    }

    onSubmit = (data) => {
        const attachments = [];
        if(this.state.autoSubastado && this.state.autoSubastado.length > 0){
            let autoSubastado = this.state.autoSubastado;
            for(let index = 0; index < autoSubastado.length; index++)
                if(autoSubastado[index] && autoSubastado[index].length > 0)
                    for(let indexFoto = 0; indexFoto < autoSubastado[index].length; indexFoto++)
                        attachments.push({ "file": autoSubastado[index][indexFoto], "name": `foto ${index} ${indexFoto}` })
        }
        this.props.crear(data, attachments);
    }

    setFoto = (file, indexFoto, indexAuto) => {
        let data = this.state.autoSubastado;
        let dataFoto = data[indexAuto] ? data[indexAuto] : []
        dataFoto[indexFoto] = file
        data[indexAuto] = dataFoto
        this.setState({ autoSubastado: data})
    }

    quitarFoto = (indexFoto, indexAuto) => {
        let data = this.state.autoSubastado;
        let dataFoto = data[indexAuto]
        dataFoto.splice(indexFoto,1)
        data[indexAuto] = dataFoto
        if(data[indexAuto].length == 0)
            data.splice(indexAuto,1)
        this.setState({ autoSubastado: data })
    }

    quitarAuto = (indexAuto) => {
        let data = this.state.autoSubastado;
        data.splice(indexAuto,1)
        this.setState({ autoSubastado: data})
    }

    render() {

        const { loader, getProveedores, getAutos } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3><strong> Crear Subasta </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            <SubastaForm
                                onSubmit={this.onSubmit}
                                getProveedores={getProveedores}
                                getAutos={getAutos}
                                setFoto={this.setFoto}
                                quitarFoto={this.quitarFoto}
                                quitarAuto={this.quitarAuto}
                                initialValues={{
                                    fecha_inicio: moment().format('YYYY-M-D'),
                                    fecha_final: moment().add(7,'days').format('YYYY-M-D'),
                                    hora_inicio: moment().format('HH:mm'),
                                    hora_final: moment().add(6,'hours').format('HH:mm')
                                }}
                            />
                        </LoadMask>

                    </div>
                </div>
            </div>
        );
    }
}

const mstp = (state) => state.subasta;

export default connect(mstp, { ...actions })(AdminSubasta);