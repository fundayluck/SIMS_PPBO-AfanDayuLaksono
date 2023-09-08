// eslint-disable-next-line import/no-anonymous-default-export
export default build =>
    build.query({
        query: (formData, token) => ({
            url: 'profile/image',
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`
            },
            body: formData,
        }),
    })