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

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
