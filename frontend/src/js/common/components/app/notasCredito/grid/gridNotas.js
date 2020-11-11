import React from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActions";
import { Link } from "react-router-dom";
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';
import moment from 'moment';


const GridNotas = ({
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
                        Fecha/hora
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="monto"
                        dataFormat={(cell)=> <RenderCurrency value={cell} />}
                    >
                        Monto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="concepto"
                    >
                        Concepto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="tarjeta"
                        dataFormat={cell=> cell.numero ? `${cell.numero}` : cell}
                    >
                        No. Tarjeta
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataFormat={standardActions({
                            ver: "notas_credito",
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </div>
        </div>
    </div>
);

export default GridNotas;