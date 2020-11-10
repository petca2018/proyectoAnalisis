import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Inicio from './common/components/inicio/Inicio';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
require('../style/index.css');

import {
    Grid as AdminAutos,
    Crear as CreatAuto,
    Editar as EditarAuto,
    Ver as VerAuto,
} from './common/components/app/autos';

import {
    Grid as AdminProveedor,
    Crear as CrearProveedor,
    Editar as EditarProveedor,
    Ver as VerProveedor,
} from './common/components/app/proveedores';

import {
    Grid as AdminClientes,
    Crear as CrearClientes,
    Editar as EditarClientes,
    Ver as VerClientes,
} from './common/components/app/clientes';

import {
    Grid as AdminSubasta,
    Crear as CrearSubasta,
    Editar as EditarSubasta,
    Ver as VerSubasta,
} from './common/components/app/subasta';

import {
    Grid as AdminOferta,
    Crear as CrearOferta,
    Editar as EditarOferta,
    Ver as VerOferta,
} from './common/components/app/ofertas';

import {
    Grid as AdminAutosComprados,
    Ver as VerAutosComprados,
} from './common/components/app/autosComprados';

import {
    Grid as AdminBancos,
    Crear as CrearBancos,
    Editar as EditarBancos,
    Ver as VerBancos,
} from './common/components/app/bancos';

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Inicio} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />

                <ProtectedRoute exact path="/auto" component={AdminAutos} />
                <ProtectedRoute exact path="/auto/crear" component={CreatAuto} />
                <ProtectedRoute exact path="/auto/:id/editar" component={EditarAuto} />
                <ProtectedRoute exact path="/auto/:id" component={VerAuto} />

                <ProtectedRoute exact path="/proveedor" component={AdminProveedor} />
                <ProtectedRoute exact path="/proveedor/crear" component={CrearProveedor} />
                <ProtectedRoute exact path="/proveedor/:id/editar" component={EditarProveedor} />
                <ProtectedRoute exact path="/proveedor/:id" component={VerProveedor} />

                <ProtectedRoute exact path="/cliente" component={AdminClientes} />
                <ProtectedRoute exact path="/cliente/crear" component={CrearClientes} />
                <ProtectedRoute exact path="/cliente/:id/editar" component={EditarClientes} />
                <ProtectedRoute exact path="/cliente/:id" component={VerClientes} />

                <ProtectedRoute exact path="/subasta" component={AdminSubasta} />
                <ProtectedRoute exact path="/subasta/crear" component={CrearSubasta} />
                <ProtectedRoute exact path="/subasta/:id/editar" component={EditarSubasta} />
                <ProtectedRoute exact path="/subasta/:id" component={VerSubasta} />

                <ProtectedRoute exact path="/ofertas" component={AdminOferta} />
                <ProtectedRoute exact path="/ofertas/crear/:id" component={CrearOferta} />
                <ProtectedRoute exact path="/ofertas/:id/editar" component={EditarOferta} />
                <ProtectedRoute exact path="/ofertas/:id" component={VerOferta} />

                <ProtectedRoute exact path="/bancos" component={AdminBancos} />
                <ProtectedRoute exact path="/bancos/crear/" component={CrearBancos} />
                <ProtectedRoute exact path="/bancos/:id/editar" component={EditarBancos} />
                <ProtectedRoute exact path="/bancos/:id" component={VerBancos} />

                <ProtectedRoute exact path="/autosComprados" component={AdminAutosComprados} />
                <ProtectedRoute exact path="/autosComprados/:id" component={VerAutosComprados} />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
