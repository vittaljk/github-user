import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import LocationLogo from '../../../assets/location.svg';
import CorporateLogo from '../../../assets/corporate.svg';
import './UserBio.scss';
import { getGithubUserUrl } from '../../../model';

const UserBio = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Axios.get(getGithubUserUrl())
        .then(({ status, data }) => {
            if (status === 200) {
                setUser(data);
            }
        })
        .catch(e => console.log(e))
    }, []);

    return (
        <>
            {user && 
                <div className="bio-wrapper">
                    <img className="avatar" src={user.avatar_url} alt="User Avatar"/>
                    <div>
                        <b className="name">{user.name}</b>
                        <div className="user-name">{user.login}</div>
                    </div>
                    <div className="bio">{user.bio}</div>
                    <button>Edit bio</button>
                    <div className="more-info">
                        <div className="company">
                            <img src={CorporateLogo} alt="company logo"/>&nbsp;{user.company}
                        </div>
                        <div className="country">
                            <img src={LocationLogo} className="Location-logo" alt="location logo" />&nbsp;{user.location}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserBio