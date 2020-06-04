import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import './UserRepoDetail.scss';
import SearchBar from '../SearchBar/SearchBar';
import moment from 'moment';
import LicenseLogo from '../../../assets/license.svg';
import StarIcon from '../../../assets/star.svg';
import Select from 'react-select';
import _ from 'lodash';
import { typeOptions, getGithubUserReposUrl } from '../../../model';

const valueFromId = (opts, id) => opts.find(o => o.value === id);

function UserRepoDetail() {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [searchText, setSearchText] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const getRepos = () => {
        Axios.get(getGithubUserReposUrl())
            .then(({ status, data }) => {
                if (status === 200) {
                    setRepos(data);
                    setFilteredRepos(data);
                    let languages = [];
                    data.forEach(repo => {
                        if (repo.language && repo.language) {
                            languages.push({ value: repo.language, label: repo.language });
                        }
                    });
                    languages = _.uniqBy(languages, 'value');
                    setLanguages(languages);
                }
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getRepos();
    }, []);

    useEffect(() => {
        applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, selectedType, selectedLanguage]);

    const handleTypeChange = ({value}) => {
        setSelectedType(value);
    }

    const handleLanguageChange = ({value}) => {
        setSelectedLanguage(value);
    }

    const searchHandler = e => {
        const value = e.target.value;
        if (value === '') {
            getRepos();
            return;
        }
        setSearchText(value);
    }

    const applyFilters = () => {
        let reposCopy = [ ...repos ];
        if (searchText) {
            reposCopy = reposCopy.filter(repo => repo.name.toLowerCase().includes(searchText.toLowerCase()));
        }
        if (selectedLanguage) {
            reposCopy = reposCopy.filter(repo => {
                if (repo.language) {
                    return repo.language.includes(selectedLanguage);
                }
                return false;
            });
        }
        if (selectedType) {
            switch (selectedType) {
                case 'all':
                    reposCopy = [ ...repos ];
                    break;
                
                case 'public':
                    reposCopy = reposCopy.filter(repo => repo.private === false)
                    break;

                
                case 'private':
                    reposCopy = reposCopy.filter(repo => repo.private === true)
                    break;

                case 'archived':
                    reposCopy = reposCopy.filter(repo => repo.archived === true)
                    break;

                default:
                    break;
            }
        }
        setFilteredRepos(reposCopy);
    }

    return (
        <div className="user-repo-detail">
            <div className="tab">
                <div className="tab-wrapper">
                    {/* TODO: remove hard coding */}
                    <div className="tab-item">Overview</div>
                    <div className="tab-item active">Repositories&nbsp;&nbsp;<span>11</span></div>
                    <div className="tab-item">Stars&nbsp;&nbsp;<span>5</span></div>
                    <div className="tab-item">Followers&nbsp;&nbsp;<span>2</span></div>
                    <div className="tab-item">Following&nbsp;&nbsp;<span>2</span></div>
                </div>
                <div>&nbsp;</div>
            </div>

            <div className="search-wrapper">
                <SearchBar searchHandler={searchHandler}/>
                <Select
                    value={valueFromId(typeOptions)}
                    onChange={handleTypeChange}
                    options={typeOptions}
                    placeholder="Type"
                />
                <Select
                    value={valueFromId(languages)}
                    onChange={handleLanguageChange}
                    options={languages}
                    placeholder="Language"
                />
                <button className="new-btn">New</button>
            </div>

            <div className="repo-wrapper">
                {filteredRepos &&
                    filteredRepos.map(repo => (
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
