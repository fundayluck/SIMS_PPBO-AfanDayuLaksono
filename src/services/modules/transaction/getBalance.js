// eslint-disable-next-line import/no-anonymous-default-export
export default build =>
    build.query({
        query: token => ({
            url: 'balance',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        }),
    })