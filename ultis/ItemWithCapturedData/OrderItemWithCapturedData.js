const getStore = ctx => {}
const _ = require('lodash')
const Bluebird = require('bluebird')
const { ItemWithCapturedData } = require('./ItemWithCapturedData')

module.exports = class OrderItemWithCapturedData extends ItemWithCapturedData {
    constructor(context) {
        super(context)

        const { getModel } = getStore(context)

        /**
         * @private
         */
        this._OrderItem = getModel('OrderItem')

        /**
         * @private
         */
        this._selectedOrderItemFields = null
    }

    withOrderItemFields(fields) {
        if (!Array.isArray(fields)) {
            throw new Error('OrderItemSelectField must be an array')
        }
        this._selectedOrderItemFields = fields.length === 0 ? null : fields
        return this
    }

    /**
     * @private
     * @param {object} filter
     */
    async getOrderItems(filter) {
        const orderItemQuery = this._OrderItem.find(filter)

        if (this._selectedOrderItemFields) {
            orderItemQuery.select(this._selectedOrderItemFields.join(' '))
        }

        if (!_.isEmpty(this.sortBy)) {
            orderItemQuery.sort(this.sortBy)
        }

        const orderItems = await orderItemQuery.lean()
        if (!orderItems.length) return []

        const transformedItems = await this.transformItems(orderItems)

        if (!this.selectArtwork) {
            return transformedItems
        }

        return Bluebird.mapSeries(transformedItems, async item => {
            const artworkInfo = await this.getArtworksByOrderItem(item)
            return { ...item, ...artworkInfo }
        })
    }

    /**
     * Get order items by IDs
     * @param {string | string[]} itemIds
     */
    async getByItemIds(itemIds) {
        return await this.getOrderItems({ _id: { $in: Array.isArray(itemIds) ? itemIds : [itemIds] } })
    }

    /**
     * Get order items by order IDs
     * @param {string | string[]} orderIds
     */
    async getByOrderIds(orderIds) {
        return await this.getOrderItems({ order: { $in: Array.isArray(orderIds) ? orderIds : [orderIds] } })
    }
}
