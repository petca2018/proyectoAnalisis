import React from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActions";
import { Link } from "react-router-dom";

const GridAutos = ({
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
                    <Link to="/auto/crear">
                        <button className="btn btn-danger"> + Añadir auto </button>
                    </Link>
                </div>
            </div>
            <div className="p-0 px-3 pt-3">
                <Grid hover striped data={data} loading={loading} page={page} onPageChange={onPageChange} >
                    <TableHeaderColumn
                        isKey
                        dataField="tipo"
                    >
                        Tipo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="modelo"
                    >
                        Modelo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="color"
                    >
                        Color
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="año"
                    >
                        Año
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataFormat={standardActions({
                            editar: "auto",
                            ver: "auto",
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

export default GridAutos;