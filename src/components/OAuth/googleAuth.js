import React from 'react'
import {GoogleLogin,GoogleLogout} from 'react-google-login'
import googleNormal from '../../assets/buttons/google_signin_normal.png';
//import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { save } from "../auth/auth"

function GoogleAuth() {
    let history = useHistory();
    
    const responseGoogle = (res)=>{
        axios({
            method: "post",
            url: `http://localhost:9000/auth/openid?openid_identifier=${res.tokenId}`,
            data: res.tokenId,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
                console.log(response);
                save(response.data);
              //handle success
                switch(response.data.role){
                    case "admin":
                        history.push('/components/admin/AdminHome');
                        break;
                    case "moderator":
                        history.push('/components/academicUser/AdminHome');
                        break;
                    case "academic":
                        history.push('/components/admin/AdminHome');
                        break;
                    case "general":
                        history.push('/components/admin/AdminHome');
                        break;   
                    default:
                        history.push('/components/admin/AdminHome');
                        break;
                }
            })
            .catch(function (err) {
              //handle error
              console.log(err);
            });
    }

    return (
        <div>
            <GoogleLogin
                clientId="710127453375-59f35pb86rqrp1aok26cbaifsuv1h3nc.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick} 
                    style={{
                    padding:'0px 0px',
                    margin: '0px',
                    border:'none',
                    backgroundColor:'#DFDAE8',
                    cursor:"pointer"
                    }}>
                        <img src={googleNormal} alt="google button" style={{width:'218px'}}/>
                    </button>
                  )}
                theme="dark"
                icon="true"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuth;