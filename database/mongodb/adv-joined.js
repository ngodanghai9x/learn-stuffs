const mongoose = require('mongoose');

const ProductAttributeSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    position: Number,
    value_type: String,
    values: [String],
    is_preselected: Boolean,
    created: Date,
});

const ProductAttribute = mongoose.model('ProductAttribute', ProductAttributeSchema);

const ProductOptionSchema = new mongoose.Schema({
    name: String,
    slug: String,
    value: String,
    position: Number,
    is_preselected: Boolean,
    attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductAttribute',
    },
});

const ProductOption = mongoose.model('ProductOption', ProductOptionSchema);

const ProductTypeSchema = new mongoose.Schema({
    type: String,
    vendor: String,
});

const ProductType = mongoose.model('ProductType', ProductTypeSchema);

const ProductSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },
    tags: [String],
    attributes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductAttribute',
        },
    ],
    is_active: Boolean,
    retail_price: Number,
    sale_price: Number,
    images: [String],
    meta: Object,
    created: Date,
    creator: String,
    external_product_id: String,
    artwork_separated_by: String,
    gallery: [String],
});

const Product = mongoose.model('Product', ProductSchema);

const ProductVariantSchema = new mongoose.Schema({
    title: String,
    sides: Number,
    image_uris: [String],
    retail_price: Number,
    sale_price: Number,
    base_cost: Number,
    currency: String,
    sku: String,
    sku_seller: String,
    is_default: Boolean,
    is_active: Boolean,
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductOption',
        },
    ],
    created: Date,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
});

const ProductVariant = mongoose.model('ProductVariant', ProductVariantSchema);

const product = await Product.findOne({ _id: productId })
    .populate({
        path: 'type',
        model: ProductType,
    })
    .populate({
        path: 'attributes',
        model: ProductAttribute,
    })
    .lean();

// product
db.products.aggregate([
    {
        $match: {
            _id: ObjectId(''),
        },
    },
    {
        $lookup: {
            from: 'producttypes',
            localField: 'type',
            foreignField: '_id',
            as: 'type',
        },
    },
    {
        $unwind: '$type',
    },
    {
        $lookup: {
            from: 'productattributes',
            localField: 'attributes',
            foreignField: '_id',
            as: 'attributes',
        },
    },
]);

const variant = await ProductVariant.findOne({ _id: variantId })
    .populate({
        path: 'options',
        model: ProductOption,
        populate: {
            path: 'attribute',
            model: ProductAttribute,
        },
    })
    .lean();

// variant
db.productvariants.aggregate([
    {
        $match: { product: ObjectId('') },
    },
    {
        $lookup: {
            from: 'productattributes',
            pipeline: [],
            as: 'allAttributes',
        },
    },
    {
        $addFields: {
            options: {
                $map: {
                    input: '$options',
                    as: 'opt',
                    in: {
                        is_preselected: '$$opt.is_preselected',
                        position: '$$opt.position',
                        name: '$$opt.name',
                        slug: '$$opt.slug',
                        value: '$$opt.value',
                        attribute: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$allAttributes',
                                        as: 'attr',
                                        cond: {
                                            $eq: ['$$attr._id', '$$opt.attribute'],
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
            },
        },
    },
]);
