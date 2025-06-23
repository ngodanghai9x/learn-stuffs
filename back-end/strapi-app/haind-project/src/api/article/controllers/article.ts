/**
 *  article controller
 */

import { factories } from '@strapi/strapi';
// import { transformResponse } from '@strapi/plugin-content-manager/server/utils/transform';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
    async summary(ctx) {
        console.log('🔥 summary endpoint called');
        const id = parseInt(ctx.params.id, 10);
        console.log('🚀 ~ summary ~ id:', id);
        const article = await strapi.entityService.findOne('api::article.article', id, {
            populate: ['author'],
        });

        console.log('🚀 ~ summary ~ article:', article);
        const result = await strapi.db.connection.raw('SELECT * FROM articles WHERE id = ?', [id]);
        console.log('🚀 ~ summary ~ result:', result);


        const schema = strapi.contentType('api::article.article');
        console.log("🚀 ~ summary ~ schema:", schema)
        // const entity = transformResponse(result.rows?.[0] , { schema });

        // console.log("🚀 ~ summary ~ entity:", entity)

        if (!article) {
            return ctx.notFound('Article not found');
        }

        return {
            //   author: article.author?.name || 'Unknown',
            article,
        };
    },
}));
