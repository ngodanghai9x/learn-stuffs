const getStore = ctx => {}
const _ = require('lodash')
const isStrictObjectId = ctx => {}
const ListingArtwork = {}

class ItemWithCapturedData {
    constructor(context) {
        this.context = context

        const { getModel } = getStore(context)

        /**
         * @private
         */
        this.Product = getModel('Product')

        /**
         * @private
         */
        this.ProductType = getModel('ProductType')

        /**
         * @private
         */
        this.ProductVariant = getModel('ProductVariant')

        /**
         * @private
         */
        this.ProductAttribute = getModel('ProductAttribute')

        this.Collection = getModel('Collection')

        /**
         * @private
         */
        this.selectedProductFields = null

        /**
         * @private
         */
        this.selectedVariantFields = null

        this.sortBy = null

        this.selectArtwork = false
    }

    /**
     * @param {string[]} fields
     */
    withProductFields(fields) {
        if (!Array.isArray(fields)) {
            throw new Error('ProductSelectField must be an array')
        }
        this.selectedProductFields = fields.length === 0 ? null : fields
        return this
    }

    /**
     * @param {string[]} fields
     */
    withVariantFields(fields) {
        if (!Array.isArray(fields)) {
            throw new Error('VariantSelectField must be an array')
        }
        this.selectedVariantFields = fields.length === 0 ? null : fields
        return this
    }

    withSort(sort) {
        if (typeof sort === 'object' && !_.isEmpty(sort)) {
            this.sortBy = sort
        }
        return this
    }

    withArtworkData(selectArtwork) {
        if (typeof selectArtwork === 'boolean') {
            this.selectArtwork = selectArtwork
        }
        return this
    }

    getProductCollections(collections) {
        if (_.isEmpty(collections)) return []
        return collections.filter(Boolean).map(c => {
            return c.hasOwnProperty('name') ? c.name : c
        })
    }

    async transformItems(items) {
        const productIds = items.map(i => i.product).filter(isStrictObjectId)
        const variantIds = items.map(i => i.variant).filter(isStrictObjectId)

        const [productMap, variantMap] = await Promise.all([
            this._fetchProducts(productIds),
            this._fetchVariants(variantIds),
        ])

        return items.map(item => {
            const {
                captured_product,
                captured_variant,
                product: productId,
                variant: variantId,
                ...rest
            } = item

            const product = captured_product || productMap[productId?.toString()] || null
            const variant = captured_variant || variantMap[variantId?.toString()] || null

            const pickedProduct = this.selectedProductFields ? _.pick(product, this.selectedProductFields) : product
            const pickedVariant = this.selectedVariantFields ? _.pick(variant, this.selectedVariantFields) : variant

            if (pickedProduct) {
                if (pickedProduct.hasOwnProperty('collections')) {
                    pickedProduct['collections'] = this.getProductCollections(pickedProduct.collections)
                }
                pickedProduct._id = _.get(pickedProduct, '_id', productId)
                pickedProduct.is_captured_product = !!captured_product
                pickedProduct.captured_product_id = pickedProduct.product_id
                delete pickedProduct.product_id
            }

            if (pickedVariant) {
                if (!pickedVariant.hasOwnProperty('product') && productId) {
                    pickedVariant['product'] = productId
                }

                pickedVariant._id = _.get(pickedVariant, '_id', variantId)
                pickedVariant.is_captured_variant = !!captured_variant
                pickedVariant.captured_variant_id = pickedVariant.variant_id
                delete pickedVariant.variant_id
            }
        
            return {
                ...rest,
                product: pickedProduct,
                variant: pickedVariant,
            }
        })
    }

    async getArtworksByOrderItem(item) {
        const artworks = await ListingArtwork.getOrderItemArtworks(this.context)(item._id)
        const level = _.get(artworks, ['0', 'level'], 'none')
        return {
            artworkData: artworks,
            artworkLevel: ['product', 'attribute'].includes(level) ? 'product' : level
        }
    }

    /**
     * @private
     * @param {string[]} ids
     */
    async _fetchProducts(ids) {
        if (!Array.isArray(ids) || !ids.length) return {}

        const query = this.Product.find({ _id: { $in: ids } })
        if (this.selectedProductFields) {
            query.select(this.selectedProductFields.join(' '))
        }

        const products = await query
            .populate([
                { path: 'type', model: this.ProductType, select: 'type vendor' },
                { path: 'artwork_separated_by', model: this.ProductAttribute, select: 'slug' },
                { path: 'collections', model: this.Collection, select: 'name' }
            ])
            .lean()

        return _.keyBy(products, '_id')
    }

    /**
     * @private
     * @param {string[]} ids
     */
    async _fetchVariants(ids) {
        if (!Array.isArray(ids) || !ids.length) return {}

        const query = this.ProductVariant.find({ _id: { $in: ids } })
        if (this.selectedVariantFields) {
            query.select(this.selectedVariantFields.join(' '))
        }

        return _.keyBy(await query.lean(), '_id')
    }
}

module.exports = { ItemWithCapturedData }
