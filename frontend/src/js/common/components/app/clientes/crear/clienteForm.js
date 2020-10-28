import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { renderField, SelectField } from  "../../../Utils/renderField/renderField";


const genderOptions = [
    { value: 0, label: "Masculino"},
    { value: 1, label: "Femenino"}
]

const Form = ({ handleSubmit, creacion }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group card p-4">
            <div className="grid-titulo padding-15">
                <div className="padding-15 p-sm-0 py-sm-1">
                    <div className="row">

                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="username"> Nombre de Usuario </label>
                            <Field
                                name="username"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="first_name"> Nombre </label>
                            <Field
                                name="first_name"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="last_name"> Apellido </label>
                            <Field
                                name="last_name"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="email"> Correo </label>
                            <Field
                                name="email"
                                component={renderField}
                                type="email"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="phone"> Teléfono </label>
                            <Field
                                name="profile.phone"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="address"> direccion </label>
                            <Field
                                name="profile.address"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="gender"> genero </label>
                            <Field
                                name="profile.gender"
                                component={SelectField}
                                options={genderOptions}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        {creacion && (
                            <div className="form-group has-feedback col-12 col-md-6">
                                <label className="t-azul"  htmlFor="password">Contraseña*</label>
                                <Field
                                    name="password"
                                    label="Contraseña"
                                    component={renderField}
                                    type="password"
                                    className="form-control"
                                    />
                            </div>
                        )}
                        {creacion && (
                            <div className="form-group has-feedback col-12 col-md-6">
                                <label className="t-azul"  htmlFor="confirm_password">Confirmar Contraseña</label>
                                <Field
                                    name="confirm_password"
                                    label="Confirmar contraseña"
                                    component={renderField}
                                    type="password"
                                    className="form-control"
                                    />
                            </div>
                        )}

                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                <Link to="/cliente"
                                    className="btn btn-secondary m-1"
                                >
                                    <i className="fa fa-times"></i>&nbsp;
                                    Cancelar
                                </Link>
                                <button type="submit"
                                    className="btn btn-danger m-1"
                                >
                                    <i className="fa fa-save"></i>&nbsp;
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
);

const ClienteForm = reduxForm({
    form: "clienteForm",
    validate: (data, props) => {
        const errors = {};
        if(!data.username) errors.username = "Campo requerido";
        if(!data.first_name) errors.first_name = "Campo requerido";
        if(!data.email) errors.email = "Campo requerido";
        if(props.creacion && !data.password) errors.password = "Campo requerido";
        else if(props.creacion && !data.confirm_password) errors.confirm_password = "Campo requerido";
        else if(props.creacion && data.password !== data.confirm_password) errors.confirm_password = "Las contraseñas no coinciden";
        return errors;
    }
})(Form);

export default ClienteForm;
