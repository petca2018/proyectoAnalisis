import React from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActions";
import { Link } from "react-router-dom";

const GridBancos = ({
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
                    <Link to="/bancos/crear">
                        <button className="btn btn-danger"> + Añadir Banco </button>
                    </Link>
                </div>
            </div>
            <div className="p-0 px-3 pt-3">
                <Grid hover striped data={data} loading={loading} page={page} onPageChange={onPageChange} >
                    <TableHeaderColumn
                        isKey
                        dataField="nombre"
                    >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="direccion"
                    >
                        Dirección
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="telefono"
                        width="25%"
                    >
                        Teléfono
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataFormat={standardActions({
                            editar: "bancos",
                            ver: "bancos",
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

export default GridBancos;