export const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'archived', label: 'Archived' }
];

export const getGithubUserUrl = (userName = 'supreetsingh247') => `https://api.github.com/users/${userName}`;

export const getGithubUserReposUrl = (userName = 'supreetsingh247') => `https://api.github.com/users/${userName}/repos`;