import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm, destroy } from 'redux-form';
import { api } from "api";
import swal from 'sweetalert2';

const LOADER = 'LOADER_CLIENTES';
const SET_DATA = "SET_DATA_CLIENTES";
const SET_PAGE = "SET_PAGE_CLIENTES";
const SET_ITEM = "SET_ITEM_CLIENTES";

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
    }else if(typeof(error) == 'object' && error.detail){
        mensage = error.detail;
    }else if(typeof(error) == 'string'){
        mensage = error;
    }
    swal.fire({
        type: "error",
        text: mensage || "Hubo un error"
    })
}
// ------------------------------------
// Actions
// ------------------------------------

const listar = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = { page };
    params.is_staff = false;
    api.get('user', params).then( data => {
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
    api.get(`user/${id}`).then((response) => {
        let profile = response.profile;
        if(profile){
            let tarjetas = response.profile.tarjetas;
            if(tarjetas && tarjetas.length)
                response.profile.tarjetas_obj = {
                    ...tarjetas[0]
                }
        }
        dispatch(setItem(response));
        if (!!'clienteForm')
            dispatch(initializeForm('clienteForm', response));
    }).catch( error => {
        handleError(error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const crear = (data) => (dispatch) => {
    dispatch(setLoader(true));
    data.is_staff = false;
    if(data.profile){
        let tarjetas = data.profile.tarjetas_obj;
        if(tarjetas && Object.keys(tarjetas).length > 0)
            data.profile.tarjetas = tarjetas
    }
    api.post('user',data).then( response =>{
        swal.fire({
            type: "success",
            text: response.detail || "Datos agregados correctamente"
        });
        dispatch(push('/cliente'))
        dispatch(destroy('clienteForm'));
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

const editar = (data) => (dispatch) => {
    dispatch(setLoader(true));
    data.profile.user = data.id;
    if(data.profile){
        let tarjetas = data.profile.tarjetas_obj;
        if(tarjetas && Object.keys(tarjetas).length > 0)
            data.profile.tarjetas = tarjetas
    }
    api.put(`user/update_cliente`, data).then( response => {
        swal.fire({
            type: "success",
            text: response.detail || "Registro actualizado!!!"
        });
        dispatch(push('/cliente'))
        dispatch(destroy('clienteForm'));
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`user/${id}`).then( response => {
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

const getBancos = search => async dispatch => {
    const params = { search }
    const data = await api.get('bancos', params)
    if(data)
        return data.results;
    return [];
}

export const actions = {
    listar,
    leer,
    crear,
    eliminar,
    editar,
    getBancos
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
