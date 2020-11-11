import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/profile';
import { getMe } from '../../../../redux/modules/cuenta/login';
import Profile from './Profile';


const ms2p = (state) => {
    return {
        ...state.login,
    };
};

const md2p = { ...actions, getMe };

export default connect(ms2p, md2p)(Profile);
