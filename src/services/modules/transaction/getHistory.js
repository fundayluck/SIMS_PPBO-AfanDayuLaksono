// eslint-disable-next-line import/no-anonymous-default-export
export default build =>
    build.query({
        query: ({ token, limit }) => ({
            url: `transaction/history?limit=${limit}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        }),
    })