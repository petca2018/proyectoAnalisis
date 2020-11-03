import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, FieldArray, reduxForm } from "redux-form";
import { validate, validators } from "validate-redux-form";
import {
    AsyncSelectField,
    renderCurrency,
    renderDayPicker,
    SelectField,
    renderFilePicker,
    renderField
} from  "../../../Utils/renderField/renderField";


class ItemArrayFotos extends Component {

    render() {
        const { remove, index, indexAuto, item, foto, setFoto } = this.props;
        return (
            <div className="col-12 col-sm-6 col-md-4 px-0">
                <div className="flex-1 d-flex justify-content-end align-items-center">
                    <button className="btn btn-link p-0"
                        type="button"
                        onClick={() => {
                            remove()
                        }}
                    >
                        <i className="fa fa-times" style={{ color: "red"}}></i>
                    </button>
                </div>
                <div className="flex-1 px-1">
                    <div className="form-group w-100">
                        <Field
                            name={`${foto}.foto`}
                            photo={
                                item && item.autoSubastado && item.autoSubastado[indexAuto] &&
                                item.autoSubastado[indexAuto].fotos[index] &&
                                item.autoSubastado[indexAuto].fotos[index].foto
                            }
                            component={renderFilePicker}
                            setFile = {setFoto}
                            top={{ top: "67px", position: "inherit" }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const renderFotos =  ({ setFoto, indexAuto, item, quitarFoto, fields, meta: { error, submitFailed } }) => (
    <div className=" col-sm-12 p-0">
        <div className=" col-sm-12 form-group np-r p-0">
            <div className="col-12 form-group np-r p-0 d-flex flex-wrap flex-row">
                {fields.map((foto, index) =>
                    <ItemArrayFotos
                        index={index}
                        key={index}
                        indexAuto={indexAuto}
                        foto={foto}
                        item={item}
                        setFoto = { (file) => setFoto(file, index) }
                        remove={() => {
                            fields.remove(index);
                            quitarFoto(index);
                        }}
                    />
                )}
            </div>
            {fields.length < 6 && (
                <div className="d-flex justify-content-start mt-2">
                    <button type="button" className="btn btn-success" onClick={() => fields.push({})}>
                        <strong> + Añadir foto </strong>
                    </button>
                </div>
            )}
        </div>
        {submitFailed &&
            error &&
            <div className="invalid-feedback-array text-danger">
                {error}
            </div>}
    </div>
)

class ItemArray extends Component {

    render() {
        const { remove, index, setFoto, quitarFoto, auto, item, getProveedores, getAutos } = this.props;
        return (
            <div className="w-100 card my-3">
                <div className="flex-1 d-flex justify-content-end align-items-center">
                    <button className="btn btn-link"
                        type="button"
                        onClick={() => {
                            remove()
                        }}
                    >
                        <i className="fa fa-times" style={{ color: "red"}}></i>
                    </button>
                </div>
                <div className="d-flex flex-row">
                    <div className="flex-1 px-4 pb-2">
                        <div className="form-group w-100">
                            <label htmlFor="auto"> Auto </label>
                            <Field
                                key={`${auto}.auto-${index}`}
                                name={`${auto}.auto`}
                                component={AsyncSelectField}
                                top={{ top: "67px", position: "inherit" }}
                                placeholder="Selecciona un auto"
                                valueKey="id"
                                labelKey="label"
                                isSearchable
                                loadOptions={getAutos}
                            />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="provedor"> Proveedor </label>
                            <Field
                                key={`${auto}.provedor-${index}`}
                                name={`${auto}.provedor`}
                                component={AsyncSelectField}
                                top={{ top: "67px", position: "inherit" }}
                                placeholder="Selecciona un proveedor"
                                valueKey="id"
                                labelKey="nombre"
                                isSearchable
                                className="form-control"
                                loadOptions={getProveedores}
                            />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="condiciones"> Condicion </label>
                            <Field
                                name={`${auto}.condiciones`}
                                component={SelectField}
                                top={{ top: "67px", position: "inherit" }}
                                placeholder="Selecciona una condicion"
                                options={[
                                    {value: "Nuevo", label: "Nuevo"},
                                    {value: "Usado", label: "Usado"},
                                    {value: "Chocado", label: "Chocado"},
                                    {value: "Optimo", label: "Optimo"}
                                ]}
                            />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="precio_base"> Precio base </label>
                            <Field
                                name={`${auto}.precio_base`}
                                component={renderCurrency}
                                top={{ top: "67px", position: "inherit" }}
                            />
                        </div>
                    </div>
                    <div className="flex-1 px-4">
                        <div> <h6 className="pb-0 mb-0"> Fotos </h6> </div>
                        <div className="form-group w-100">
                            <FieldArray
                                name={`${auto}.fotos`}
                                component={renderFotos}
                                setFoto={setFoto}
                                quitarFoto={quitarFoto}
                                indexAuto={index}
                                item={item}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const renderAutos = ({ setFoto, quitarFoto, quitarAuto, item, getProveedores, getAutos, fields, meta: { error, submitFailed } }) => (
    <div className=" col-sm-12 p-0">
        <div className=" col-sm-12 form-group np-r p-0">
            <div className="col-12 form-group np-r mt-2 p-0">
                {fields.map((auto, index) =>
                    <ItemArray
                        index={index}
                        key={index}
                        auto={auto}
                        item={item}
                        getProveedores={getProveedores}
                        getAutos={getAutos}
                        setFoto={(file, indexFoto) => setFoto(file, indexFoto, index)}
                        quitarFoto={(indexFoto) => quitarFoto(indexFoto, index)}
                        remove={() => {
                            fields.remove(index);
                            quitarAuto(index);
                        }}
                    />
                )}
            </div>
            <div className="d-flex justify-content-start mt-2">
                <button type="button" className="btn btn-success" onClick={() => fields.push({})}>
                    <strong> + Añadir auto </strong>
                </button>
            </div>
        </div>
        {submitFailed &&
            error &&
            <div className="invalid-feedback-array text-danger">
                {error}
            </div>}
    </div>
)

const Form = ({ handleSubmit, setFoto, quitarFoto, quitarAuto, item, getProveedores, getAutos }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group card p-4">
                <div className="grid-titulo padding-15">
                    <div className="padding-15 p-sm-0 py-sm-1">
                        <div className="row">

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="fecha_inicio"> Fecha de inicio </label>
                                <Field
                                    name="fecha_inicio"
                                    component={renderDayPicker}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="hora_inicio"> Hora de inicio </label>
                                <Field
                                    name="hora_inicio"
                                    component={renderField}
                                    type="time"
                                />
                            </div>
                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="fecha_final"> Fecha de fin </label>
                                <Field
                                    name="fecha_final"
                                    component={renderDayPicker}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="hora_final"> Hora de fin </label>
                                <Field
                                    name="hora_final"
                                    component={renderField}
                                    type="time"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="form-group w-100">
                <FieldArray
                    name="autoSubastado"
                    component={renderAutos}
                    getProveedores={getProveedores}
                    getAutos={getAutos}
                    item={item}
                    setFoto={setFoto}
                    quitarFoto={quitarFoto}
                    quitarAuto={quitarAuto}
                />
            </div>

            <div className="row py-4">
                <div className="col-12">
                    <div className="d-flex justify-content-end flex-column flex-sm-row align-items-stretch align-items-sm-center">
                        <Link to="/subasta"
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

        </form>
    );
    }

const SubastaForm = reduxForm({
    form: "subastaForm",
    validate: (data) =>{
        const errors = {};
        if(!data.fecha_inicio) errors.fecha_inicio = "Campo requerido";
        if(!data.fecha_final) errors.fecha_final = "Campo requerido";
        if(!data.hora_inicio) errors.hora_inicio = "Campo requerido"
        // else if(data.hora_inicio < moment().format("HH:mm"))
        //     errors.hora_inicio = "La hora de inicio no puede se menor"
        // if(!data.hora_final) errors.hora_final = "Campo requerido";
        // else if(data.hora_final < moment().format("HH:mm") || data.hora_final < moment().format("HH:mm"))
        //     errors.hora_final = "La hora final no puede ser menor";
        if(!data.autoSubastado || !data.autoSubastado.length)
            errors.autos = {_error: 'Se necesita al menos un auto'}
        else{
            const detalleArray = []
            data.autoSubastado.forEach((auto, index) => {
                let detErrors = {};
                let repetidos = [];
                if(auto.auto){
                    repetidos = _.filter(data.autoSubastado, (x) => {
                        if(x.auto)
                            return  x.auto.id == auto.auto.id
                        return false;
                    });
                }
                if(!auto.auto) detErrors.auto =  "Campo requerido";
                else if(1 < repetidos.length) detErrors.auto = "El auto está repetido"

                if(!auto.provedor) detErrors.provedor = "Campo requerido"
                if(!auto.condiciones) detErrors.condiciones = "Campo requerido";
                if(!auto.precio_base) detErrors.precio_base = "Campo requerido";
                if(detErrors) detalleArray[index] = detErrors;
            });
            if(detalleArray.length){
                errors.autoSubastado = detalleArray
            }
        }
        return errors;
    }
})(Form);

export default SubastaForm;
