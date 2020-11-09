import React from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActions";
import { Link } from "react-router-dom";
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';
import moment from 'moment';


const GridOfertas = ({
    data,
    loading,
    page,
    onPageChange,
    eliminar,
    adicional,
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
                        dataField="fecha_hora"
                        dataFormat = { cell => moment(cell).format('DD/MM/YYYY HH:mm A')}
                    >
                        Fecha
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto"
                        dataFormat={(cell)=> <RenderCurrency value={cell} />}
                    >
                        Monto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="profile"
                        dataFormat={cell=> cell.user ? cell.user.username : cell}
                    >
                        Usuario
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="autoSubastado"
                        dataFormat={cell=> cell.auto ? `${cell.auto.tipo} ${cell.auto.modelo}` : cell}
                    >
                        Auto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataFormat={standardActions({
                            adicional: (id,row) => adicional(id,row),
                            ver: "ofertas",
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

export default GridOfertas;