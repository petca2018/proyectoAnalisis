import React from 'react';
import { Link } from 'react-router-dom';
const defaultAvatar = require("../../../../../assets/img/avatar-placeholder.png");


const ProfileDetalle = (props) => {

    const { me, eliminarTarjeta } = props;

    return (
            <div className="py-4">
                <h2> Detalle del perfil</h2>
                {me && me.user && (
                    <div className="mb-4 card card-small d-flex flex-column">
                        <div className="border-bottom card-header"><h6 className="m-0">{me.first_name} {me.last_name}</h6></div>
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="flex-1 mx-3 d-flex justify-content-center aling-items-center">
                                <img src = {me.avatar ? me.avatar : defaultAvatar}  style={{ maxWidth:"80%" }}/>
                            </div>
                            <div className="d-flex flex-column flex-1 mx-3">
                                <div>
                                    <small>Username</small>
                                    <h6> {me.user.username} </h6>
                                </div>

                                <div>
                                    <small >Nombre completo</small>
                                    <h6> {`${me.user.first_name} ${me.user.last_name}`} </h6>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <h5 className="pl-4"> Perfil </h5>
                        <div className="p-4 pt-3 flex-1 d-flex flex-column flex-md-row">
                                <div className="flex-1">
                                    <small >Teléfono</small>
                                    <h6> {me.phone ? me.phone : 'No agregado'} </h6>
                                </div>
                                <div className="flex-1">
                                    <small>Género</small>
                                    <h6> {`${me.gender ? 'Femenino' : 'Masculino'}`} </h6>
                                </div>
                                <div className="flex-1">
                                    <small>Dirección</small>
                                    <h6> {me.address} </h6>
                                </div>
                        </div>
                        <h5 className="pl-4 pb-0"> Tarjeta </h5>
                        {me.tarjetas && me.tarjetas.length > 0 ? me.tarjetas.map( itemTarjeta => (
                            <div className="px-4 flex-1 d-flex flex-column" key = {itemTarjeta.id}>
                                <div className="flex-1 d-flex flex-row p-3" style={{ border: "1px solid #e2e2e2", borderRadius: "5px" }}>
                                    <div className="flex-1">
                                        <small>Numero de tarjeta</small>
                                        <h6> {itemTarjeta.numero} </h6>
                                    </div>
                                    <div className="flex-1">
                                        <small>Banco</small>
                                        <h6> {itemTarjeta.banco.nombre} </h6>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center p-4">
                                        <i className="fa fa-times"
                                            onClick={()=>{eliminarTarjeta(itemTarjeta.id)}}
                                            style={{ cursor: "pointer" }}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="flex-1 d-flex pb-3 justify-content-center align-items-center">
                                <label> Ninguna tarjeta agregada! </label>
                            </div>
                        )}
                        <hr/>
                        <div className="d-flex justify-content-end pb-4 px-3 align-items-center">

                            <Link to = {`/user-profile/${me.id}/editar`}
                                className="btn btn-danger m-1"
                            >
                                <i className="fa fa-edit"></i>&nbsp;
                                Editar
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        );
};

export default ProfileDetalle;
