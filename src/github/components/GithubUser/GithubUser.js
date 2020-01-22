import React from 'react'
import UserBio from '../UserBio/UserBio';
import UserRepoDetail from '../UserRepoDetail/UserRepoDetail';
import './GithubUser.scss';

function GithubUser() {
    return (
        <div className="container">
            <div className="github-user-wrapper">
                <UserBio />
                <UserRepoDetail />
            </div>
        </div>
    )
}

export default GithubUser