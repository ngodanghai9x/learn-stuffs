const _ = require('lodash')
const Bluebird = require('bluebird')
const { ItemWithCapturedData } = require('./ItemWithCapturedData')
const { getStore } = require('@pf126/mongos-connector')

module.exports = class FulfillItemWithCapturedData extends ItemWithCapturedData {
    constructor(context) {
        super(context)

        const { getModel } = getStore(context)

        getModel('OrderItem')

        this.Fulfill = getModel('Fulfill')

        this.FulfillItem = getModel('FulfillItem')

        this.selectedFulfillItemFields = null
    }

    /**
     * @param {string[]} fields
     */
    withFulfillItemFields(fields) {
        if (!Array.isArray(fields)) {
            throw new Error('FulfillItemSelectField must be an array')
        }
        this.selectedFulfillItemFields = fields.length === 0 ? null : fields
        return this
    }

    async getOrderItems(filter) {
        const query = this.FulfillItem.find(filter)
        if (this.selectedFulfillItemFields) {
            query.select(this.selectedFulfillItemFields.join(' '))
        }
        query.populate('order_item')

        if (!_.isEmpty(this.sortBy)) {
            query.sort(this.sortBy)
        }

        const fulfillmentItems = await query.lean()
        if (!fulfillmentItems.length) return []

        const orderItems = fulfillmentItems
            .map(item => item.order_item)
            .filter(orderItem => typeof orderItem === 'object')

        const orderItemsWithCapturedData = await this.transformItems(orderItems)
        const fulfillmentItemsWithCapturedData = fulfillmentItems.map(ffmItem => {
            const orderItem = orderItemsWithCapturedData.find(orderItem => {
                return `${orderItem._id}` === `${_.get(ffmItem, ['order_item', '_id'])}`
            })
            if (!orderItem) {
                throw new Error('Order item not found')
            }

            const { product, variant } = orderItem
            ffmItem['product'] = product
            ffmItem['variant'] = variant
            ffmItem['order_item'] = orderItem
            return ffmItem
        })

        if (!this.selectArtwork) {
            return fulfillmentItemsWithCapturedData
        }

        return Bluebird.mapSeries(fulfillmentItemsWithCapturedData, async item => {
            const orderItem = item.order_item
            const artworkInfo = await this.getArtworksByOrderItem(orderItem)
            return { ...item, ...artworkInfo }
        })
    }

    /**
     * Get fulfillment items by IDs
     * @param {string | string[]} orderItemIds
     */
    async getByOrderItemIds(orderItemIds) {
        return await this.getOrderItems({ _id: { $in: Array.isArray(orderItemIds) ? orderItemIds : [orderItemIds] } })
    }

    /**
     * Get fulfillment items by fulfillment IDs
     * @param {string | string[]} fulfillmentIds
     */
    async getByFulfillIds(fulfillmentIds) {
        return await this.getOrderItems({ fulfillment: { $in: Array.isArray(fulfillmentIds) ? fulfillmentIds : [fulfillmentIds] } })
    }
}
