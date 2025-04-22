// import { GraphQLClient, gql } from 'graphql-request';
// import gr = require('graphql-request');
// const { GraphQLClient, gql } = gr;
// const { GraphQLClient, gql } = require('graphql-request');

(async () => {
    const { GraphQLClient, gql } = await import('graphql-request');

    // === Thông tin cấu hình ===
    const SHOPIFY_SHOP = 'haind-store.myshopify.com';
    const ACCESS_TOKEN = 'shpat_xxx';

    const endpoint = `https://${SHOPIFY_SHOP}/admin/api/2025-04/graphql.json`;

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            'X-Shopify-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'application/json',
        },
    });

    // === GraphQL mutation ===
    const mutation = gql`
        mutation fulfillmentServiceUpdate($id: ID!, $name: String) {
            fulfillmentServiceUpdate(
                id: $id
                name: $name
                callbackUrl: "https://4f6a-222-252-31-240.ngrok-free.app/webhook/hifadhi-store"
                inventoryManagement: true
                requiresShippingMethod: true
                trackingSupport: true
                permitsSkuSharing: true
                fulfillmentOrdersOptIn: true
            ) {
                fulfillmentService {
                    id
                    serviceName
                    callbackUrl
                    inventoryManagement
                    requiresShippingMethod
                    trackingSupport
                    permitsSkuSharing
                    fulfillmentOrdersOptIn
                    location {
                        id
                        legacyResourceId
                        isPrimary
                        deletable
                        activatable
                        deletable
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const query = gql`
        query {
            orders(first: 10) {
                edges {
                    cursor
                    node {
                        id
                        createdAt
                        confirmationNumber
                        fulfillable
                        displayFulfillmentStatus
                        fulfillmentsCount {
                            count
                            precision
                        }
                        customer {
                            id
                            displayName
                            createdAt
                        }
                        # lineItems(first: 5) {
                        #     edges {
                        #         node {
                        #             id
                        #             isGiftCard
                        #             name
                        #             title
                        #             sku
                        #             quantity
                        #             product {
                        #                 id
                        #                 handle
                        #             }
                        #         }
                        #     }
                        # }
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
            }
        }
    `;

    // === Biến truyền vào mutation ===
    const variables = {
        id: 'gid://shopify/FulfillmentService/59184840802',
        name: '[Current]all_for_one_express222',
    };

    // === Gửi request ===
    async function updateFulfillmentService() {
        try {
            const data = await graphQLClient.request(mutation, variables);
            console.log('Mutation result:', JSON.stringify(data, null, 2));

            const data2 = await graphQLClient.request(query);
            console.log("🚀 ~ updateFulfillmentService ~ data2:", data2)
        } catch (error) {
            console.error('GraphQL Error:', error);
        }
    }

    updateFulfillmentService();
})();
