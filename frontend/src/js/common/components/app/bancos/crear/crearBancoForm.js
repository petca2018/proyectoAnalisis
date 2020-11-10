import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, validators } from "validate-redux-form";
import { renderField } from  "../../../Utils/renderField/renderField";


const Form = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group card p-4">
            <div className="grid-titulo padding-15">
                <div className="padding-15 p-sm-0 py-sm-1">
                    <div className="row">

                        <div className="form-group col-12">
                            <label htmlFor="nombre"> Nombre </label>
                            <Field
                                name="nombre"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="direccion"> Direccion </label>
                            <Field
                                name="direccion"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="telefono"> Telefono </label>
                            <Field
                                name="telefono"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                <Link to="/bancos"
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

const BancoForm = reduxForm({
    form: "bancoForm",
    validate: (data) =>
        validate(data, {
            nombre: validators.exists()("Campo requerido"),
            direccion: validators.exists()("Campo requerido"),
            telefono: validators.exists()("Campo requerido"),
        }),
})(Form);

export default BancoForm;
