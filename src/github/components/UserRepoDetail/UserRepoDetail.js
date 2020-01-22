import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import './UserRepoDetail.scss';
import SearchBar from '../SearchBar/SearchBar';
import moment from 'moment';
import LicenseLogo from '../../../assets/license.svg';
import StarIcon from '../../../assets/star.svg';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

function UserRepoDetail() {
    const [repos, setRepos] = useState([]);
    const [type, setType] = useState(null)

    useEffect(() => {
        Axios.get('https://api.github.com/users/supreetsingh247/repos')
            .then(({ status, data }) => {
                if (status === 200) {
                    setRepos(data);
                    console.log(data);
                }
            })
            .catch(e => console.log(e))
    }, []);

    const handleTypeChange = value => {
        setType(value);
    }

    return (
        <div className="user-repo-detail">
            <div className="tab">
                <div className="tab-wrapper">
                    <div className="tab-item">Overview</div>
                    <div className="tab-item active">Repositories&nbsp;&nbsp;<span>11</span></div>
                    <div className="tab-item">Stars&nbsp;&nbsp;<span>5</span></div>
                    <div className="tab-item">Followers&nbsp;&nbsp;<span>2</span></div>
                    <div className="tab-item">Following&nbsp;&nbsp;<span>2</span></div>
                </div>
                <div>&nbsp;</div>
            </div>

            <div className="search-wrapper">
                <SearchBar />
                <Select
                    value={type}
                    onChange={handleTypeChange}
                    options={options}
                    placeholder="Type"
                />
                <Select
                    value={type}
                    onChange={handleTypeChange}
                    options={options}
                    placeholder="Language"
                />
                <button className="new-btn">New</button>
            </div>

            <div className="repo-wrapper">
                {repos &&
                    repos.map(repo => (
                        <div className="repo" key={repo.id}>
                            <div className="name">
                                <a href={repo.html_url}>{repo.name}</a>
                            </div>
                            <div className="desc">{repo.description}</div>
                            <div className="details-wrapper">
                                {repo.language && <div className="language">
                                    <div className="dot"></div>&nbsp;&nbsp;{repo.language}
                                </div>}
                                <div className="updatedAt">Updated {moment(repo.updated_at).fromNow()}</div>
                                <div className="count">{repo.stargazers_count > 0 && <div className="flex-center"><img src={StarIcon} alt="LicenseLogo" /> &nbsp;{repo.stargazers_count}</div>}</div>
                                <div className="license">{repo.license && <div className="flex-center"><img src={LicenseLogo} alt="LicenseLogo" /> &nbsp;{repo.license.name}</div>}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserRepoDetail
