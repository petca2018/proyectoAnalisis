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

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
