import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import swal from 'sweetalert2';

const LOADER = 'LOADER_PROVEEDOR';
const SET_DATA = "SET_DATA_PROVEEDOR";
const SET_PAGE = "SET_PAGE_PROVEEDOR";
const SET_ITEM = "SET_ITEM_PROVEEDOR";

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: SET_DATA,
    data
})

const setPage = page => ({
    type: SET_PAGE,
    page
})

const setItem = item => ({
    type: SET_ITEM,
    item,
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

const listar = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    api.get('proveedor').then( data => {
        dispatch(setPage(page));
        dispatch(setData(data));
    }).catch( error => {
        handleError(error);
    }).finally( () =>{
        dispatch(setLoader(false))
    })
}

const leer = id => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`proveedor/${id}`).then((response) => {
        dispatch(setItem(response));
        if (!!'proveedorForm')
            dispatch(initializeForm('proveedorForm', response));
    }).catch( error => {
        handleError(error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('proveedor',data).then( response =>{
        swal.fire({
            type: "success",
            text: response.detail || "Datos agregados correctamente"
        });
        dispatch(push('/proveedor'))
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

const editar = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.put(`proveedor/${data.id}`, data).then( response => {
        swal.fire({
            type: "success",
            text: response.detail || "Registro actualizado!!!"
        });
        dispatch(push('/proveedor'))
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`proveedor/${id}`).then( response => {
        swal.fire({
            type: "success",
            text: response.detail || "Registro eliminado correctamente"
        });
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

export const actions = {
    listar,
    leer,
    crear,
    eliminar,
    editar,
};

const reducers = {
    [LOADER]: (state, { loader }) => ({ ...state, loader }),
    [SET_DATA]: (state, { data }) => ({ ...state, data }),
    [SET_PAGE]: (state, { page }) => ({ ...state, page }),
    [SET_ITEM]: (state, { item }) => ({ ...state, item }),
};

const initialState = {
    loader: false,
    page: 1,
    item: {},
    data: {
        count:0,
        next:null,
        previous:null,
        results: []
    }
};

export default handleActions(reducers, initialState);
