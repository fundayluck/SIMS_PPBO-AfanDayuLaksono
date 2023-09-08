// eslint-disable-next-line import/no-anonymous-default-export
export default build =>
    build.query({
        query: (credentials, token) => ({
            url: 'profile/update',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: { ...credentials },
        }),
    })