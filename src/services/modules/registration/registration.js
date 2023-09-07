// eslint-disable-next-line import/no-anonymous-default-export
export default build =>
    build.query({
        query: credentials => ({
            url: 'registration',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: { ...credentials },
        }),
    })