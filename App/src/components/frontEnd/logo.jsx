import React from 'react';
import { Link } from 'react-router-dom'

function LogoImage(props) {

    return <Link to={`/`} >
        <img src={`https://react.pixelstrap.com/multikart/assets/images/icon/logo.png`} alt="" className="img-fluid" />
    </Link>
}

export default LogoImage;