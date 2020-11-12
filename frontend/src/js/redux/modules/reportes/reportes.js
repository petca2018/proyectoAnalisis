import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { api } from "api";
import swal from 'sweetalert2';

const LOADER = 'LOADER_REPORTES';
const SET_AUTOS_REPORTE = "SET_AUTOS_REPORTE";
const SET_VENTAS_REPORTE = "SET_VENTAS_REPORTE";
const SET_CLIENTE = "SET_CLIENTE";

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setReporteAutos = item => ({
    type: SET_AUTOS_REPORTE,
    item,
})

const setReporteVentas = item => ({
    type: SET_VENTAS_REPORTE,
    item
})

const handleError = error => {
    console.log(error);
    let mensage;
    if(typeof(error) == 'object' && error.statusText){
        mensage = error.statusText;
    }else if(typeof(error) == 'string'){
        mensage = error;
    }
    swal.fire({
        type: "error",
        text: mensage || "Hubo un error al obtener los datos"
    })
}
// ------------------------------------
// Actions
// ------------------------------------

const reporteAutosComprados = id => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`reportes/reporte_autos_comprados`).then((response) => {
        dispatch(setReporteAutos(response));
    }).catch( error => {
        handleError(error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const reporteVentasRealizadas = () => (dispatch, getStore) => {
    dispatch(setLoader(false))
    const store = getStore().reportes;
    const params = {};
    if(store.cliente)
        params.cliente = store.cliente.profile.id
    api.get('reportes/reporte_ventas', params).then( data => {
        dispatch(setReporteVentas(data));
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const setCliente = (cliente) => (dispatch) => {
    dispatch({ type: SET_CLIENTE, cliente });
    dispatch(reporteVentasRealizadas())
}

const getClientes = search => dispatch => {
    let params = {}
    if(search)
        params.search = search;
    return api.get("user", params). then((data) => {
        if (data){
            for(let index = 0; index < data.results.length; index++){
                data.results[index].label = `${data.results[index].first_name} ${data.results[index].last_name}`
            }
            return data.results;
        }
        return [];
    }).catch(() => {
        return [];
    });
};


export const actions = {
    reporteAutosComprados,
    reporteVentasRealizadas,
    getClientes,
    setCliente,
};

const reducers = {
    [LOADER]: (state, { loader }) => ({ ...state, loader }),
    [SET_AUTOS_REPORTE]: (state, { item }) => ({ ...state, reporteAutos: item }),
    [SET_VENTAS_REPORTE]: (state, { item }) => ({ ...state, reporteVentas: item }),
    [SET_CLIENTE]: (state, {cliente}) => ({ ...state, cliente }),
};

const initialState = {
    loader: false,
    reporteAutos: [],
    reporteVentas: {},
    cliente: null,
};

export default handleActions(reducers, initialState);
