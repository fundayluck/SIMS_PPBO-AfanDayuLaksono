// eslint-disable-next-line import/no-anonymous-default-export
export default build =>
    build.query({
        query: params => ({
            url: 'login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
    })