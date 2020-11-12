import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from '../../../../../redux/modules/reportes/reportes';
import { Async } from 'react-select';
import { Chart } from "react-google-charts";
import classNames from 'classnames';


class ReporteAutosComprados extends Component {

    componentDidMount(){
        this.props.reporteAutosComprados();
        this.props.reporteVentasRealizadas();
    }

    render() {

        const { reporteAutos, reporteVentas, getClientes, setCliente, cliente } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 pt-2">
                    <div className="card p-4 mb-3">
                        <div className="grid-title py-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Reporte autos comprados </strong> </h3>
                        </div>

                        <div className="d-flex justify-content-center">
                            <Chart
                                chartType="ColumnChart"
                                loader={<div>Cargando grafica</div>}
                                data={ reporteAutos || []}
                                width="100%"
                                height="300px"
                                legendToggle
                                options={{
                                    bar: { groupWidth: "40%" },
                                }}
                            />
                        </div>
                    </div>

                    <div className="card p-4 mb-3">
                        <div className="grid-title pt-4 d-flex flex-column justify-content-center align-items-stretch align-items-sm-center">
                            <h3> <strong> Reporte Ventas </strong> </h3>
                        </div>
                        <div className={"col-md-6 col-12 align-self-end"}>
                            <span className="t-azul-claro font-weight-bold">Cliente</span>
                            <Async
                                isClearable={true}
                                backspaceRemovesValue={false}
                                value={cliente}
                                isSearchable={true}
                                loadOptions={getClientes}
                                getOptionValue={(option) => (option["id"])}
                                getOptionLabel={(option) => (option["label"])}
                                type="text"
                                onChange={(e) => setCliente(e)}
                                multi={true}
                                autoload={false}
                                cache={false}
                                className={classNames('react-select-container ')}
                                defaultOptions={true}
                                placeholder="Seleccionar.."
                            />
                        </div>
                        <div>
                            <Chart
                                chartType="BarChart"
                                loader={<div>Cargando grafica</div>}
                                data={ reporteVentas || []}
                                width="100%"
                                height="600px"
                                options={{
                                    legend: { position: 'none' },
                                }}
                                legendToggle
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mstp = (state) => state.reportes;

export default connect(mstp, { ...actions })(ReporteAutosComprados);