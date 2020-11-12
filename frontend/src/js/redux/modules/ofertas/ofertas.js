import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import swal from 'sweetalert2';
import moment from 'moment';

const LOADER = 'LOADER_OFERTAS';
const SET_DATA = "SET_DATA_OFERTAS";
const SET_PAGE = "SET_PAGE_OFERTAS";
const SET_ITEM = "SET_ITEM_OFERTAS";

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
        text: mensage || "Hubo un error"
    })
}
// ------------------------------------
// Actions
// ------------------------------------

const listar = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = { page }
    api.get('ofertas', params).then( data => {
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
    api.get(`ofertas/${id}`).then((response) => {
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
    api.post('ofertas',data).then( response =>{
        swal.fire({
            type: "success",
            text: response.detail || "Datos agregados correctamente"
        });
        dispatch(push('/ofertas'))
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

const editar = (editar, row) => (dispatch) => {
    dispatch(setOferta(editar, row));
}

const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`ofertas/${id}`).then( response => {
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

const leerAutoSubastado = id => dispatch => {
    dispatch(setLoader(true));
    api.get('subasta/get_auto_subastado',{id}).then( response => {
        dispatch(setItem(response));
    }).catch( error => {
        handleError(error)
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const limpiarItem = () => (dispatch) => {
    dispatch(setItem({}));
}

const setOferta = (editar = false, data) => (dispatch, getStore) => {
    const { me: { profile } } = getStore().login;
    const { item } = getStore().ofertas;
    const { id } = item;
    let mejorar_oferta = false;
    let mi_oferta;
    if(item.ofertas)
        mi_oferta = item.ofertas.find(itemOfertas => itemOfertas.mi_oferta == true)
    console.log(moment().format())
    if(mi_oferta){
        editar = true;
        mejorar_oferta = true;
        data = {
            id: mi_oferta.id,
            profile: { id: mi_oferta.profile },
            autoSubastado: item
        }
    }

    swal.fire({
        title: 'Monto de la oferta',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        showLoaderOnConfirm: true,
        preConfirm: (monto) => {
            const params = {
                fecha_hora: moment().format(),
                monto,
            }
            if(!editar){
                params.autoSubastado = id;
                params.profile = profile.id;
                return api.post('ofertas',params)
                .then(response => {
                    return response
                })
                .catch(error => {
                    let mensaje = ""
                    if(typeof(error) == 'string'){
                        mensaje = error;
                    } else if(typeof(error) == 'object'){
                        if(error.detail) mensaje = error.detail;
                    }
                    if(mensaje.length === 0) mensaje = "El proceso no se pudo completar"
                    swal.showValidationMessage(
                    `Error: ${mensaje}`
                    )
                })
            } else {
                params.autoSubastado = data.autoSubastado.id;
                params.profile = data.profile.id;
                return api.put(`ofertas/${data.id}/`,params)
                .then(response => {
                    return response
                })
                .catch(error => {
                    console.log(error)
                    swal.showValidationMessage(
                        error.detail || `Hubo un error`
                    )
                })
            }
        },
        allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
        if(result.value){
            let mensaje = "";
            if (result.detail)
                mensaje = result.detail;
            else if(typeof(result) == 'string')
                mensaje = result;
            else
                mensaje = "Oferta recibida"
            swal.fire({
                type: "success",
                text: mensaje,
            })
            if(!editar || mejorar_oferta) dispatch(leerAutoSubastado(id))
            else dispatch(listar())
        }
    })
}

export const actions = {
    listar,
    leer,
    crear,
    eliminar,
    editar,
    leerAutoSubastado,
    setOferta,
    limpiarItem,
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
