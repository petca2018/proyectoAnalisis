import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeFom } from 'redux-form';
import { api } from "api";
import {setMe} from "./login";
import swal from 'sweetalert2';

const LOADER = 'LOGIN_LOADER';
const SET_PROFILE_ITEM = 'SET_PROFILE_ITEM';
const SET_DATA_NOTAS = "SET_DATA_NOTAS";
const SET_PAGE_NOTAS = "SET_PAGE_NOTAS";
const SET_ITEM_NOTA = "SET_ITEM_NOTA";

export const constants = {
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});
// ------------------------------------
// Actions
// ------------------------------------

export const update = (data = {}, attachments=[]) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    if(data.profile){
        let tarjetas = data.profile.tarjetas_obj;
        if(tarjetas && Object.keys(tarjetas).length > 0)
            data.profile.tarjetas = tarjetas
    }
    console.log(data)
    api.putAttachments('user/update_me', data, attachments).then((response) => {
        dispatch(setMe(response));
        NotificationManager.success('Datos actualizados exitosamente', 'ERROR', 1000);
        dispatch(push(`/user-profile/${data.id}`))
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const leerPerfil = id => dispatch => {
    dispatch(setLoader(true));
    api.get(`user/${id}/profile`).then(data => {
        dispatch(setItemProfile(data))
        if('profile')
            dispatch(initializeFom('profile',data))
    }).catch( error => {
        console.log(error)
        swal.fire({
            type: "error",
            text: error.detail || "Hubo un error"
        })
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const getBancos = search => async dispatch => {
    const params = { search }
    const data = await api.get('bancos', params)
    if(data)
        return data.results;
    return [];
}

const eliminarTarjeta = id => dispatch => {
    swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            dispatch(setLoader(true));
            api.eliminar(`/user/${id}/eliminarTarjeta`).then( data => {
                swal.fire(
                    'Eliminado!',
                    'La tarjeta ha sido eliminada.',
                    'success'
                )
                dispatch(leerPerfil(data.profile))
            }).catch( error => {
                swal.fire({
                    type: "error",
                    text: error.detail || "Hubo un error"
                })
            }).finally( () => {
                dispatch(setLoader(false));
            })
        }
    });
}

const listarNotasCredito = (page = 1) => dispatch => {
    dispatch(setLoader(true));
    const params = { page }
    api.get('subasta/get_notas_credito', params).then( data => {
        dispatch(setDataNotas(data));
        dispatch(setPageNotas(page));
    }).catch( error => {
        swal.fire({
            type: "error",
            text: error.detail || "Hubo un error"
        })
    }).finally ( () => {
        dispatch(setLoader(false));
    })
}

const leerNotasCredito = id => dispatch => {
    dispatch(setLoader(true));
    api.get(`subasta/${id}/get_nota_credito`).then( data => {
        dispatch(setItemNotaCredito(data))
    }).catch( error => {
        console.log(error)
        swal.fire({
            type:"error",
            text: error.detail || "Hubo un error"
        })
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

const setDataNotas = data => ({
    type: SET_DATA_NOTAS,
    data,
})

const setPageNotas = page => ({
    type: SET_PAGE_NOTAS,
    page
})

const setItemNotaCredito = item => ({
    type: SET_ITEM_NOTA,
    item
})

export const actions = {
    update,
    leerPerfil,
    getBancos,
    eliminarTarjeta,
    listarNotasCredito,
    leerNotasCredito
};

const setItemProfile = data => ({
    type: SET_PROFILE_ITEM,
    data
})

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_PROFILE_ITEM]: (state, { data }) => ({ ...state, itemProfile: data }),
    [SET_PAGE_NOTAS]: (state, {page}) => ({ ...state, pageNotas: page }),
    [SET_DATA_NOTAS]: (state, {data}) => ({ ...state, dataNotas: data }),
    [SET_ITEM_NOTA]: (state, {item}) => ({ ...state, itemNotas: item}),
};

export const initialState = {
    loader: false,
    itemProfile: {},
    pageNotas: 1,
    dataNotas: {
        count:0,
        next:null,
        previous:null,
        results: []
    },
    itemNotas:{}
};

export default handleActions(reducers, initialState);
