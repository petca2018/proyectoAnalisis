import React, { Component } from 'react';
import ProfileDetalle from "./ProfileDetalle";


class Profile extends Component {

    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.leerPerfil(params.id)
    }

    render() {

        const { itemProfile, eliminarTarjeta } = this.props;

        return (
            <ProfileDetalle me={itemProfile} eliminarTarjeta={eliminarTarjeta} />
        );
    }
}

export default Profile;
