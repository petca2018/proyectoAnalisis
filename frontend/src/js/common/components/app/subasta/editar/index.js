import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../../../../../redux/modules/subasta/subasta';
import SubastaForm from '../crear/subastaForm';
import LoadMask from '../../../Utils/LoadMask/LoadMask';
import moment from "moment";


class AdminSubasta extends Component {

    state = {
        autoSubastado: []
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leer(params.id);
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
        this.props.editar(data, attachments);
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
        if(data && data.length){
            let dataFoto = data[indexAuto]
            if(dataFoto){
                dataFoto.splice(indexFoto,1)
                data[indexAuto] = dataFoto
            }
            if(data[indexAuto].length == 0)
                data.splice(indexAuto,1)
            this.setState({ autoSubastado: data })
        }
    }

    quitarAuto = (indexAuto) => {
        let data = this.state.autoSubastado;
        data.splice(indexAuto,1)
        this.setState({ autoSubastado: data})
    }

    render() {

        const { loader, getAutos, getProveedores, item } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="grid-container">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Editar Subasta </strong> </h3>
                        </div>

                        <LoadMask loading={loader} light blur >
                            <SubastaForm onSubmit={this.onSubmit}
                                getProveedores={getProveedores}
                                item = { item }
                                getAutos={getAutos}
                                setFoto={this.setFoto}
                                quitarFoto={this.quitarFoto}
                                quitarAuto={this.quitarAuto}
                                initialValues={{
                                    fecha_inicio: moment().toDate(),
                                    fecha_fin: moment().add(7,'days').toDate()
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