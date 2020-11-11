import React from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActions";
import { Link } from "react-router-dom";
import moment from 'moment';


const GridSubasta = ({
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
                    <div className="flex-1">
                    </div>
                    <Link to="/subasta/crear">
                        <button className="btn btn-danger"> + Añadir Subasta </button>
                    </Link>
                </div>
            </div>
            <div className="p-0 px-3 pt-3">
                <Grid hover striped data={data} loading={loading} page={page} onPageChange={onPageChange} >
                    <TableHeaderColumn
                        isKey
                        dataField="fecha_inicio"
                        dataFormat={(cell)=> moment(cell).format('DD/MM/YYYY HH:mm A')}
                    >
                        Fecha Inicio
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="fecha_fin"
                        dataFormat={(cell)=> moment(cell).format('DD/MM/YYYY HH:mm A')}
                    >
                        Fecha final
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="total_autos"
                        width="13%"
                    >
                        Autos
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="cerrado"
                        width="15%"
                        dataFormat = { cell => cell ? 'Cerrado' : 'Abierto' }
                    >
                        estado
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        width= "20%"
                        dataFormat={standardActions({
                            editar: "subasta",
                            ver: "subasta",
                            eliminar: (id) => eliminar(id)
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </div>
        </div>
    </div>
);

export default GridSubasta;