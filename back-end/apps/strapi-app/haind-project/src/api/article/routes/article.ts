/**
 * article router.
 */

import { Core, factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::article.article', {
    config: {
        summary: {
            auth: false,
            policies: [],
        },
    },
    // gpt faked these code
    // routes: [
    //     {
    //         method: 'GET',
    //         path: '/articles/summary/:id',
    //         handler: 'article.summary',
    //         config: {
    //             auth: false,
    //         },
    //     },
    // ],
} as Core.CoreAPI.Router.RouterConfig<any>);
