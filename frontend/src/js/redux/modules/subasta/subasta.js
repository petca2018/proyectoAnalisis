import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import swal from 'sweetalert2';
import moment from 'moment';

const LOADER = 'LOADER_SUBASTA';
const SET_DATA = "SET_DATA_SUBASTA";
const SET_PAGE = "SET_PAGE_SUBASTA";
const SET_ITEM = "SET_ITEM_SUBASTA";
const SET_SUBASTAS = "SET_SUBASTAS";
const SET_AUTOS_COMPRADOS = "SET_AUTOS_COMPRADOS";
const PAGE_AUTOS_COMPRADOS = "PAGE_AUTOS_COMPRADOS";
const SET_ITEM_AUTOS_COMPRADOS = "SET_ITEM_AUTOS_COMPRADOS";
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
    const params = { page }
    api.get('subasta', params).then( data => {
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
    api.get(`subasta/${id}`).then((response) => {
        dispatch(setItem(response));
        if (!!'subastaForm'){
            response.fecha_inicio = moment(`${response.fecha_inicio}`).format('YYYY-MM-DD');
            response.fecha_final = moment(`${response.fecha_fin}`).format('YYYY-MM-DD');
            response.hora_inicio = moment(`${response.fecha_inicio}`).format('HH:mm');
            response.hora_final = moment(`${response.fecha_fin}`).format('HH:mm');
            let array = [];
            response.autoSubastado.map( item => {
                array.push({
                    ...item,
                    auto: {
                        ...item.auto,
                        label: `${item.auto.tipo}(${item.auto.año}) - ${item.auto.color} - ${item.auto.modelo}`
                    }
                });
            })
            response.autoSubastado = array;
            dispatch(initializeForm('subastaForm', response));
        }
    }).catch( error => {
        handleError(error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const crear = (data, attachments=[]) => (dispatch) => {
    dispatch(setLoader(true));
    const params = {
        fecha_inicio: moment(`${data.fecha_inicio} ${data.hora_inicio}`).format(),
        fecha_fin: moment(`${data.fecha_final} ${data.hora_final}`).format(),
        autoSubastado: {
            ...data.autoSubastado
        }
    }
    api.postAttachments('subasta',params, attachments).then( response =>{
        swal.fire({
            type: "success",
            text: response.detail || "Datos agregados correctamente"
        });
        dispatch(push('/subasta'))
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

const editar = (data, attachments=[]) => (dispatch) => {
    dispatch(setLoader(true));
    const params = {
        id: data.id,
        cerrado: data.cerrado,
        fecha_inicio: moment(`${data.fecha_inicio} ${data.hora_inicio}`).format(),
        fecha_fin: moment(`${data.fecha_final} ${data.hora_final}`).format(),
        autoSubastado: {
            ...data.autoSubastado
        },
    }
    api.putAttachments(`subasta/${data.id}`, params, attachments).then( response => {
        swal.fire({
            type: "success",
            text: response.detail || "Registro actualizado!!!"
        });
        dispatch(push('/subasta'))
        dispatch(listar());
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`subasta/${id}`).then( response => {
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

const getProveedores = search => async dispatch => {
    const params = { search };
    const data = await api.get('proveedor', params)
    if(data) return data.results;
    return [];
}

const getAutos = (search) => async(dispatch) => {
    const params = { search };
    const data = await api.get('auto', params)
    if(data) {
        let array = []
        data.results.map( item => array.push({
            ...item,
            label: `${item.tipo}(${item.año}) - ${item.color} - ${item.modelo}`
        }))
        return array;
    }
    return [];
}

const getSubastas = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = {
        page,
        cerrado: false,
    };
    api.get('subasta', params).then( data => {
        dispatch(setSubastas(data));
    }).catch( error => {
        handleError(error);
    }).finally( () => {
        dispatch(setLoader(false));
    })
}

const crearOferta = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('subasta', params).then( response => {
        swal.fire({
            type: "success",
            text: response.detail || "Oferta enviada!"
        })
        dispatch(getSubastas());
    }).catch( error => {
        handleError(error)
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const cerrarSubasta = id => (dispatch) => {
    dispatch(setLoader(true));
    api.post(`subasta/${id}/cerrar_subasta`).then( response => {
        swal.fire({
            type: "success",
            text: response.detail || "Subasta cerrada"
        }).then( () => {
            dispatch(leer(id))
        })
    }).catch( error => handleError(error))
    .finally( () => {
        dispatch(setLoader(false))
    })
}

const listarAutosComprados = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = { page };
    api.get('subasta/get_autos_comprados', params).then( data => {
        dispatch(setPageAutosComprados(page));
        dispatch(setAutosComprados(data));
    }).catch( error => {
        handleError(error);
    }).finally( () =>{
        dispatch(setLoader(false))
    })
}

const leerAutosComprados = id => dispatch => {
    dispatch(setLoader(true))
    api.get(`subasta/${id}/retrive_autos_comprados`).then(data => {
        dispatch(setItemAutosComprados(data));
    }).catch( error => {
        handleError(error)
    }).finally( () => {
        dispatch(setLoader(false))
    })
}

const setSubastas = (data) => (dispatch) => {
    dispatch({
        type: SET_SUBASTAS,
        data
    })
}

const setAutosComprados = (data) => (dispatch) => {
    dispatch({
        type: SET_AUTOS_COMPRADOS,
        data
    })
}

const setPageAutosComprados = ( page ) => (dispatch) => {
    dispatch({
        type: PAGE_AUTOS_COMPRADOS,
        page
    })
}

const setItemAutosComprados = item => dispatch => {
    dispatch({
        type: SET_ITEM_AUTOS_COMPRADOS,
        item
    })
}

export const actions = {
    listar,
    leer,
    crear,
    eliminar,
    editar,
    getProveedores,
    getAutos,
    getSubastas,
    cerrarSubasta,
    listarAutosComprados,
    leerAutosComprados,
    crearOferta
};

const reducers = {
    [LOADER]: (state, { loader }) => ({ ...state, loader }),
    [SET_DATA]: (state, { data }) => ({ ...state, data }),
    [SET_PAGE]: (state, { page }) => ({ ...state, page }),
    [SET_ITEM]: (state, { item }) => ({ ...state, item }),
    [SET_SUBASTAS]: (state, { data }) => ({ ...state, subastas: data }),
    [SET_AUTOS_COMPRADOS]: (state, { data }) => ({ ...state, autosComprados: data }),
    [PAGE_AUTOS_COMPRADOS]: (state, { page }) => ({ ...state, pageAutosComprados: page }),
    [SET_ITEM_AUTOS_COMPRADOS]: (state, { item }) => ({ ...state, itemAutosComprados: item}),
};

const initialState = {
    loader: false,
    subastas: {
        count:0,
        next:null,
        previous:null,
        results: []
    },
    page: 1,
    pageAutosComprados: 1,
    itemAutosComprados: {},
    item: {},
    data: {
        count:0,
        next:null,
        previous:null,
        results: []
    },
    autosComprados: {
        count:0,
        next:null,
        previous:null,
        results: []
    }
};

export default handleActions(reducers, initialState);
