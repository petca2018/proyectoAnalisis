import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import swal from 'sweetalert2';

const LOADER = 'LOGIN_LOADER';
const SET_DATA = "SET_DATA_AUTOS";
const SET_PAGE = "SET_PAGE_AUTOS";
const SET_ITEM = "SET_ITEM_AUTOS";

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
    const params = { page }
    api.get('auto', params).then( data => {
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
    api.get(`auto/${id}`).then((response) => {
        dispatch(setItem(response));
        if (!!'autoForm')
            dispatch(initializeForm('autoForm', response));
    }).catch( error => {
        handleError(error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('auto',data).then( response =>{
        swal.fire({
            type: "success",
            text: response.detail || "Datos agregados correctamente"
        });
        dispatch(push('/auto'))
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

const editar = (data) => (dispatch) => {
    dispatch(setLoader(true));
    api.put(`auto/${data.id}`, data).then( response => {
        swal.fire({
            type: "success",
            text: response.detail || "Registro actualizado!!!"
        });
        dispatch(push('/auto'))
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`auto/${id}`).then( response => {
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
