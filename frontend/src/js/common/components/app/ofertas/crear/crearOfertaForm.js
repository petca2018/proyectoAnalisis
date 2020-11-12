import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, validators } from "validate-redux-form";
import { renderCurrency, renderField } from  "../../../Utils/renderField/renderField";
import { RenderCurrency } from '../../../Utils/renderField/renderReadField';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from 'moment';


const Form = ({ handleSubmit, item, setOferta }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group card p-4">
            <div className="grid-titulo padding-15">
                <div className="padding-15 p-sm-0 py-sm-1">


                    {item && Object.keys(item).length > 0 && item.auto && (
                        <div className="d-flex flex-column ">
                            <div className="flex-1 d-flex flex-column flex-sm-row">
                                <div className="col-12 col-sm-6">
                                    <label> Galeria </label>
                                    <Carousel showArrows dynamicHeight infiniteLoop swipeable autoPlay className="w-100">
                                        {item.fotos && item.fotos.length && item.fotos.map( itemFoto => (
                                            <div key = { itemFoto.id }>
                                                <img className="p-1" width="100%" alt="alt"
                                                    src={itemFoto.foto && itemFoto.foto }
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                    <div>
                                        <strong style={{ fontWeight: "bolder" }}> Descripcion: </strong>
                                        <p>
                                            {item.descripcion ? item.descripcion : 'sin descripcion'}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 px-0 px-sm-4">
                                    <h4 style={{ fontWeight: "bolder" }}>{`${item.auto.tipo} - ${item.auto.modelo}`}</h4>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Modelo: </strong>
                                            {`${item.auto.modelo} ${item.auto.año}`}
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Color: </strong>
                                            {item.auto.color}
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Precio base: </strong>
                                            <RenderCurrency value = {item.precio_base} />
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Condiciones: </strong>
                                            {item.condiciones}
                                        </label>
                                    </div>
                                    <hr className="w-100"/>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Proveedor: </strong>
                                            {item.provedor.nombre}
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Dirección: </strong>
                                            {item.provedor.direccion}
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Teléfono: </strong>
                                            {item.provedor.telefono}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr className="w-100"/>
                            <div className="flex-1 px-sm-4 d-flex flex-column flex-sm-row">
                                <div className="flex-1">
                                    <h6 className="mb-0" style={{ fontWeight: "bolder" }}> Subasta </h6>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Comienza: </strong>
                                            {moment(item.subasta.fecha_inicio).format('DD/MM/YYYY HH:mm A')}
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <strong style={{ fontWeight: "bolder" }}> Finaliza: </strong>
                                            {moment(item.subasta.fecha_fin).format('DD/MM/YYYY HH:mm A')}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex-1 pl-sm-4">
                                    <h6 className="mb-0" style={{ fontWeight: "bolder" }}> Ofertas </h6>
                                    {item.ofertas && item.ofertas.length > 0 ? (
                                        <div className="flex-1 d-flex flex-column table py-2" style={{ maxHeight: "150px", overflow: "auto" }}>
                                            {item.ofertas.map( itemOfertas => (
                                                <div key={itemOfertas.id} className="flex-1 d-flex flex-column align-items-end mb-1"
                                                    style={{ borderBottom: "1px solid #ccc", backgroundColor: `${itemOfertas.mi_oferta ? '#f2f2f2' : 'white'}` }
                                                }>
                                                    <h6 className="mb-0" data-toggle={itemOfertas.mi_oferta == true && 'tooltip'} title={itemOfertas.mi_oferta == true ? "Mi oferta" : ""}
                                                        style={{ color: `${itemOfertas.mi_oferta ? '#c4183c' : '#212529'}` }}
                                                    >
                                                        <RenderCurrency value = {itemOfertas.monto}/>
                                                    </h6>
                                                    <small style={{ color: "#666" }}>
                                                        {moment(itemOfertas.fecha_hora).format('DD/MM/YYYY HH:mm A')}
                                                    </small>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex-1 d-flex flex-column align-items-end">
                                            <h6> Ninguna oferta registrada </h6>
                                        </div>
                                    )}
                                    <div className="flex-1 d-flex justify-content-end">
                                        {!moment(item.subasta.fecha_inicio).isAfter(moment())
                                            ? moment(item.subasta.fecha_fin).isAfter(moment())
                                                ? <button className="btn btn-danger" type="button" onClick={setOferta}>
                                                    <i className="fa fa-money" aria-hidden="true"></i> &nbsp;
                                                    {item.ofertas && item.ofertas.find( item => item.mi_oferta == true) !== undefined
                                                      ? 'Mejorar mi oferta'
                                                      : 'Realizar un oferta'
                                                    }
                                                </button>
                                                : <h6> La subasta esta cerrada! </h6>
                                            : <h6> No se pueden realizar ofertas todavia </h6>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    </form>
);

const OfertaForm = reduxForm({
    form: "ofertaForm",
    validate: (data) =>
        validate(data, {
            tipo: validators.exists()("Campo requerido"),
            modelo: validators.exists()("Campo requerido"),
            color: validators.exists()("Campo requerido"),
            año: validators.exists()("Campo requerido"),
        }),
})(Form);

export default OfertaForm;
