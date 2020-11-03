import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import autos from './modules/autos/autos';
import proveedor from './modules/proveedor/proveedor';
import clientes from './modules/clientes/clientes';
import subasta from './modules/subasta/subasta';

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    autos,
    proveedor,
    clientes,
    subasta,
});
