module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/articles/summary/:id',
            handler: 'article.summary',
            config: {
                auth: false,
            },
        },
        // {
        //     // Path với regular expression
        //     method: 'GET',
        //     path: '/restaurants/:category([a-z]+)',
        //     handler: 'restaurant.findByCategory',
        // },
    ],
};
