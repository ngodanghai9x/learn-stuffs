const slowProductAggregate = [
    {
        $match: {
            is_active: true,
            is_deleted: false,
            is_taken_down: false,
            $or: [
                {
                    $and: [
                        {
                            'external_product_id.source': 'shopify',
                        },
                        {
                            'external_product_id.identifier': 'dev-shopify',
                        },
                    ],
                },
                {
                    creator: 'frontend',
                },
            ],
        },
    },
    {
        $lookup: {
            from: 'omniProductSyncs',
            let: {
                productId: '$_id',
            },
            pipeline: [
                {
                    $project: {
                        plf_product_id: 1,
                        external_platform: 1,
                        external_product_id: 1,
                        external_credential: 1,
                        status: 1,
                        action_type: 1,
                        note: 1,
                        archived_at: 1,
                    },
                },
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: ['$plf_product_id', '$$productId'],
                                },
                                {
                                    $eq: ['$external_platform', 'shopify'],
                                },
                                {
                                    $eq: ['$external_credential.id', 'abc1231421'],
                                },
                            ],
                        },
                    },
                },
                {
                    $sort: {
                        created_at: -1,
                    },
                },
                {
                    $limit: 1,
                },
                {
                    $project: {
                        plf_product_id: 1,
                        external_platform: 1,
                        external_product_id: 1,
                        external_credential: 1,
                        status: 1,
                        action_type: 1,
                        note: 1,
                        archived_at: 1,
                    },
                },
            ],
            as: 'integrationInfo',
        },
    },
    {
        $addFields: {
            integrationInfo: {
                $cond: {
                    if: {
                        $gt: [
                            {
                                $size: '$integrationInfo',
                            },
                            0,
                        ],
                    },
                    then: {
                        $arrayElemAt: ['$integrationInfo', 0],
                    },
                    else: '$$REMOVE',
                },
            },
        },
    },
    // {
    //   $match: {
    //     "integrationInfo.status": "success",
    //     "integrationInfo.archived_at": {
    //       $exists: true
    //     }
    //   }
    // }
    {
        $project: {
            is_active: 1,
            is_deleted: 1,
            is_taken_down: 1,
            title: 1,
            created: 1,
            creator: 1,
            external_product_id: 1,
            integrationInfo: 1,
        },
    },
    {
        $sort: {
            created: -1,
        },
    },
    {
        $skip: 0,
    },
    {
        $limit: 12,
    },
];

const fastProductAggregate = [
    {
        $match: {
            is_active: true,
            is_deleted: false,
            is_taken_down: false,
            $or: [
                {
                    $and: [
                        {
                            'external_product_id.source': 'shopify',
                        },
                        {
                            'external_product_id.identifier': 'dev-shopify',
                        },
                    ],
                },
                {
                    creator: 'frontend',
                },
            ],
        },
    },
    {
        $lookup: {
            from: 'omniProductSyncs',
            let: {
                productId: '$_id',
            },
            pipeline: [
                {
                    $project: {
                        plf_product_id: 1,
                        external_platform: 1,
                        external_product_id: 1,
                        external_credential: 1,
                        status: 1,
                        action_type: 1,
                        note: 1,
                        archived_at: 1,
                    },
                },
                {
                    $match: {
                        external_platform: 'shopify',
                        'external_credential.id': 'abc1231421',
                        status: 'success',
                        archived_at: {
                            $exists: true,
                        },
                    },
                },
                {
                    $match: {
                        $expr: {
                            $eq: ['$plf_product_id', '$$productId'],
                        },
                    },
                },
                {
                    $sort: {
                        created_at: -1,
                    },
                },
                {
                    $limit: 1,
                },
                {
                    $project: {
                        plf_product_id: 1,
                        external_platform: 1,
                        external_product_id: 1,
                        external_credential: 1,
                        status: 1,
                        action_type: 1,
                        note: 1,
                        archived_at: 1,
                    },
                },
            ],
            as: 'integrationInfo',
        },
    },
    {
        $addFields: {
            integrationInfo: {
                $cond: {
                    if: {
                        $gt: [
                            {
                                $size: '$integrationInfo',
                            },
                            0,
                        ],
                    },
                    then: {
                        $arrayElemAt: ['$integrationInfo', 0],
                    },
                    else: '$$REMOVE',
                },
            },
        },
    },
    {
        $project: {
            is_active: 1,
            is_deleted: 1,
            is_taken_down: 1,
            title: 1,
            created: 1,
            creator: 1,
            external_product_id: 1,
            integrationInfo: 1,
        },
    },
    {
        $sort: {
            created: -1,
        },
    },
    {
        $skip: 0,
    },
    {
        $limit: 12,
    },
];
