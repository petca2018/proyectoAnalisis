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
                            <label htmlFor="tipo"> Tipo </label>
                            <Field
                                name="tipo"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="modelo"> Modelo </label>
                            <Field
                                name="modelo"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="color"> Color </label>
                            <Field
                                name="color"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="año"> Año </label>
                            <Field
                                name="año"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                                <Link to="/auto"
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

const AutoForm = reduxForm({
    form: "autoForm",
    validate: (data) =>
        validate(data, {
            tipo: validators.exists()("Campo requerido"),
            modelo: validators.exists()("Campo requerido"),
            color: validators.exists()("Campo requerido"),
            año: validators.exists()("Campo requerido"),
        }),
})(Form);

export default AutoForm;
