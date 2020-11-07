import React from 'react';
const fotoDefault = require('../../../../assets/img/avatar-placeholder.png');
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Tarjeta = ({
    id,
    alt,
    fotos,
    titulo,
    subtitulo,
    texto,
    boton,
}) => (
    <div className="card d-flex flex-column flex-sm-row row">
        <div className="flex-1 col-12 col-sm-6 d-flex flex-wrap p-2 align-items-center justify-content-center">
                <Carousel showArrows dynamicHeight infiniteLoop swipeable autoPlay className="w-100">
                    {fotos && fotos.length && fotos.map( itemFoto => (
                        <div key = { itemFoto.id }>
                            <img className="p-1" width="100%" alt={alt}
                                src={itemFoto.foto ? itemFoto.foto : fotoDefault }
                            />
                        </div>
                    ))}
                </Carousel>
        </div>
        <div className="card-body col-12 col-sm-6">
            <h5 className="card-title">{titulo}</h5>
            {subtitulo && (
                <h6 className="card-subtitle mb-2 text-muted">{subtitulo}</h6>
            )}
            <p className="card-text">{texto}</p>
            <Link to={`/ofertas/crear/${id}`}
                className="btn btn-danger btn-block">
                    <i className="fa fa-money" aria-hidden="true"></i> &nbsp;
                    {boton}
            </Link>
        </div>
    </div>
)

export default Tarjeta;