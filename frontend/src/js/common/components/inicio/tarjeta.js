import React from 'react';
const fotoDefault = require('../../../../assets/img/avatar-placeholder.png');

const Tarjeta = ({
    src,
    alt,
    titulo,
    subtitulo,
    texto,
    boton,
}) => (
    <div className="card">
        <img className="card-img-top" width="100%" alt={alt}
            src={src ? src : fotoDefault }
            style={{ padding: "1rem" }}
        />
        <div className="card-body">
            <h5 className="card-title">{titulo}</h5>
            {subtitulo && (
                <h6 className="card-subtitle mb-2 text-muted">{subtitulo}</h6>
            )}
            <p className="card-text">{texto}</p>
            <a href="#" className="btn btn-danger btn-block">{boton}</a>
        </div>
    </div>
)

export default Tarjeta;