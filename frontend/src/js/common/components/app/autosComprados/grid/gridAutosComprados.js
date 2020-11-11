import React from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActions";
import { Link } from "react-router-dom";
import moment from 'moment';
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';


const GridAutosComprados = ({
    data,
    loading,
    page,
    onPageChange,
    eliminar,
}) => (
    <div className="mb-4 col-12">
        <div className="mb-4 card card-small">
            <div className="border-bottom card-header">
                <div className="d-flex flex-row justify-content-left">
                </div>
            </div>
            <div className="p-0 px-3 pt-3">
                <Grid hover striped data={data} loading={loading} page={page} onPageChange={onPageChange} >
                    <TableHeaderColumn
                        isKey
                        dataField="autoSubastado"
                        dataFormat={ (cell,row) => <div>
                                <label> {`Numero: ${row.id}`} </label> <br/>
                                <labe> {`Inicio: ${cell.subasta && moment(cell.subasta.fecha_inicio).format('DD/MM/YYYY HH:mm A')} `} </labe> <br/>
                                <labe> {`Fin: ${cell.subasta && moment(cell.subasta.fecha_fin).format('DD/MM/YYYY HH:mm A')}`} </labe> <br/>
                                <label>  </label>
                            </div>}
                    >
                        Subasta
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="autoSubastado"
                        dataFormat={ cell =>
                                cell.auto && (
                                    <div>
                                        <label> {`Tipo: ${cell.auto.tipo}`} </label> <br/>
                                        <labe> {`Modelo: ${cell.auto.modelo}`}</labe> <br/>
                                        <labe> {`Color: ${cell.auto.color}`}</labe> <br/>
                                        <labe> {`Año: ${cell.auto.año}`}</labe> <br/>
                                    </div>
                                )
                        }
                    >
                        Auto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto"
                        dataFormat={cell=> <RenderCurrency value={cell}/>}
                    >
                        Monto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        width= "15%"
                        dataFormat={standardActions({
                            ver: "autosComprados",
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </div>
        </div>
    </div>
);

export default GridAutosComprados;