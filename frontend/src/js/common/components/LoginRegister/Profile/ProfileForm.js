import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {renderField, renderFilePicker, SelectField,
    renderNumber, AsyncSelectField} from '../../Utils/renderField/renderField';
import {Link} from 'react-router-dom';


const genders = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},
];

const ProfileForm = (props) => {
    const { handleSubmit, me, setAvatar, getBancos } = props;
    return (
            <form action="" onSubmit={handleSubmit} className="py-4">
                <h2>PERFIL</h2>
                <div className="mb-4 card card-small">
                    <div className="border-bottom card-header"><h6 className="m-0">{me.first_name} {me.last_name}</h6></div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="form-group has-feedback flex-1 mx-3">
                            <label htmlFor="avatar">Avatar</label>
                            <Field photo={me.profile && me.profile.avatar ? me.profile.avatar : null} setFile={setAvatar} name="avatar" component={renderFilePicker} />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="username">Username</label>
                                <Field name="username" placeholder="Username" component={renderField} type="text" className="form-control" />
                            </div>

                            <div className="form-group has-feedback">
                                <label htmlFor="first_name">Nombre</label>
                                <Field name="first_name" placeholder="Nombre" component={renderField} type="text" className="form-control" />
                            </div>

                            <div className="form-group has-feedback">
                                <label htmlFor="last_name">Apellido</label>
                                <Field name="last_name" placeholder="Nombre" component={renderField} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="form-group has-feedback flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.phone">Teléfono</label>
                                <Field
                                    numberFormat={"+(502) ####-####"}
                                    name="profile.phone"
                                    placeholder="Teléfono"
                                    component={renderNumber}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.gender">Género</label>
                                <Field name="profile.gender" placeholder="Género" component={SelectField} options={genders} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group has-feedback flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.address">Dirección</label>
                                <Field name="profile.address" placeholder="Dirección" component={renderField} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="px-4">
                        <h5> Tarjeta </h5>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="form-group has-feedback flex-1 mx-3">
                            <label htmlFor="profile.tarjetas_obj.numero">Numero</label>
                            <Field
                                numberFormat={"#### #### #### ####"}
                                name="profile.tarjetas_obj.numero"
                                component={renderNumber}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group has-feedback flex-1 mx-3">
                            <label htmlFor="profile.tarjetas_obj.banco">Banco</label>
                            <Field
                                key={`banco`}
                                name={`profile.tarjetas_obj.banco`}
                                component={AsyncSelectField}
                                top={{ top: "67px", position: "inherit" }}
                                placeholder="Selecciona un banco"
                                valueKey="id"
                                labelKey="nombre"
                                isSearchable
                                loadOptions={getBancos}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center pb-4">
                        <Link to={`/user-profile/${me.id}`}
                            className="btn btn-secondary mb-3 mr-3"
                        >
                            <i className="fa fa-times"></i>&nbsp;
                            Cancelar
                        </Link>
                        <button className="btn btn-danger mb-3 mr-3">
                            <i className="fa fa-save"></i>&nbsp;
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        );
};

export default reduxForm({
    form: 'profile', // a unique identifier for this form
})(ProfileForm);
