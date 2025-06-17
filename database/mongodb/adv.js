// query so sánh capture product
db = db.getSiblingDB("db-3bp");
db.orderitems.aggregate([
  {
    $match: {
      "order": ObjectId("1234")
    }
  },
  
  {
    $lookup: {
      from: "products",
      localField: "captured_product.product_id",
      foreignField: "_id",
      as: "source_product"
    }
  },
  { $unwind: "$source_product" },
  
  {
    $lookup: {
      from: "producttypes",
      localField: "source_product.type",
      foreignField: "_id",
      as: "producttype"
    }
  },
  { 
    $unwind: { 
      path: "$producttype", 
      preserveNullAndEmptyArrays: true 
    } 
  },
  
  {
    $lookup: {
      from: "productattributes",
      localField: "source_product.attributes",
      foreignField: "_id",
      as: "source_attributes"
    }
  },
  
  {
    $project: {
      "_id": 1,
      "order": 1,
      "mismatched_fields": {
        $map: {
          input: {
            $filter: {
              input: {
                $objectToArray: {
                  
                  "description": {
                    "source": "$source_product.description",
                    "captured": "$captured_product.description", 
                    "match": { $eq: ["$source_product.description", "$captured_product.description"] }
                  },
                  "tags": {
                    "source": "$source_product.tags",
                    "captured": "$captured_product.tags",
                    "match": { $eq: ["$source_product.tags", "$captured_product.tags"] }
                  },
                  "is_active": {
                    "source": "$source_product.is_active",
                    "captured": "$captured_product.is_active",
                    "match": { $eq: ["$source_product.is_active", "$captured_product.is_active"] }
                  },
                  "images": {
                    "source": "$source_product.images",
                    "captured": "$captured_product.images",
                    "match": { $eq: ["$source_product.images", "$captured_product.images"] }
                  },
                  "creator": {
                    "source": "$source_product.creator",
                    "captured": "$captured_product.creator",
                    "match": { $eq: ["$source_product.creator", "$captured_product.creator"] }
                  },
                  "gallery": {
                    "source": "$source_product.gallery",
                    "captured": "$captured_product.gallery",
                    "match": { $eq: ["$source_product.gallery", "$captured_product.gallery"] }
                  },
                  "product_id": {
                    "source": "$source_product._id",
                    "captured": "$captured_product.product_id",
                    "match": { $eq: ["$source_product._id", "$captured_product.product_id"] }
                  },
                  "title": {
                    "source": "$source_product.title",
                    "captured": "$captured_product.title",
                    "match": { $eq: ["$source_product.title", "$captured_product.title"] }
                  },
                  "external_product_id": {
                    "source": "$source_product.external_product_id",
                    "captured": "$captured_product.external_product_id",
                    "match": { $eq: ["$source_product.external_product_id", "$captured_product.external_product_id"] }
                  },
                  "meta": {
                    "source": "$source_product.meta",
                    "captured": "$captured_product.meta",
                    "match": { $eq: ["$source_product.meta", "$captured_product.meta"] }
                  },
                  "created": {
                    "source": "$source_product.created",
                    "captured": "$captured_product.created",
                    "match": { $eq: ["$source_product.created", "$captured_product.created"] }
                  },
                  "slug": {
                    "source": "$source_product.slug",
                    "captured": "$captured_product.slug",
                    "match": { $eq: ["$source_product.slug", "$captured_product.slug"] }
                  },
                  "retail_price": {
                    "source": "$source_product.retail_price",
                    "captured": "$captured_product.retail_price",
                    "match": { $eq: ["$source_product.retail_price", "$captured_product.retail_price"] }
                  },
                  "sale_price": {
                    "source": "$source_product.sale_price",
                    "captured": "$captured_product.sale_price",
                    "match": { $eq: ["$source_product.sale_price", "$captured_product.sale_price"] }
                  },
                  "artwork_separated_by": {
                    "source": "$source_product.artwork_separated_by",
                    "captured": "$captured_product.artwork_separated_by",
                    "match": { $eq: ["$source_product.artwork_separated_by", "$captured_product.artwork_separated_by"] }
                  },
                  
                  "attr_values_0": {
                    "source": { $arrayElemAt: [{ $arrayElemAt: ["$source_attributes.values", 0] }, 0] },
                    "captured": { $arrayElemAt: [{ $arrayElemAt: ["$captured_product.attributes.values", 0] }, 0] },
                    "match": { $eq: [
                      { $arrayElemAt: [{ $arrayElemAt: ["$source_attributes.values", 0] }, 0] },
                      { $arrayElemAt: [{ $arrayElemAt: ["$captured_product.attributes.values", 0] }, 0] }
                    ]}
                  },
                  "attr_is_preselected": {
                    "source": { $arrayElemAt: ["$source_attributes.is_preselected", 0] },
                    "captured": { $arrayElemAt: ["$captured_product.attributes.is_preselected", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_attributes.is_preselected", 0] },
                      { $arrayElemAt: ["$captured_product.attributes.is_preselected", 0] }
                    ]}
                  },
                  "attr_name": {
                    "source": { $arrayElemAt: ["$source_attributes.name", 0] },
                    "captured": { $arrayElemAt: ["$captured_product.attributes.name", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_attributes.name", 0] },
                      { $arrayElemAt: ["$captured_product.attributes.name", 0] }
                    ]}
                  },
                  "attr_slug": {
                    "source": { $arrayElemAt: ["$source_attributes.slug", 0] },
                    "captured": { $arrayElemAt: ["$captured_product.attributes.slug", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_attributes.slug", 0] },
                      { $arrayElemAt: ["$captured_product.attributes.slug", 0] }
                    ]}
                  },
                  "attr_position": {
                    "source": { $arrayElemAt: ["$source_attributes.position", 0] },
                    "captured": { $arrayElemAt: ["$captured_product.attributes.position", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_attributes.position", 0] },
                      { $arrayElemAt: ["$captured_product.attributes.position", 0] }
                    ]}
                  },
                  "attr_value_type": {
                    "source": { $arrayElemAt: ["$source_attributes.value_type", 0] },
                    "captured": { $arrayElemAt: ["$captured_product.attributes.value_type", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_attributes.value_type", 0] },
                      { $arrayElemAt: ["$captured_product.attributes.value_type", 0] }
                    ]}
                  },
                  "attr_created": {
                    "source": { $arrayElemAt: ["$source_attributes.created", 0] },
                    "captured": { $arrayElemAt: ["$captured_product.attributes.created", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_attributes.created", 0] },
                      { $arrayElemAt: ["$captured_product.attributes.created", 0] }
                    ]}
                  },
                  
                  "type": {
                    "source": "$producttype.type",
                    "captured": "$captured_product.type.type",
                    "match": { $eq: ["$producttype.type", "$captured_product.type.type"] }
                  }
                }
              },
              as: "item",
              cond: { $eq: ["$$item.v.match", false] }
            }
          },
          as: "mismatch",
          in: {
            field: "$$mismatch.k",
            source_value: "$$mismatch.v.source",
            captured_value: "$$mismatch.v.captured"
          }
        }
      }
    }
  }
])
// query so sánh capture variant
db = db.getSiblingDB("db-3bp");
db.orderitems.aggregate([
  {
    $match: {
      "order": ObjectId("1234")
    }
  },
  
  {
    $lookup: {
      from: "productvariants",
      let: { variant_id: "$captured_variant.variant_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$_id", "$$variant_id"] }
          }
        },
        {
          $lookup: {
            from: "productattributes",
            pipeline: [],
            as: "allAttributes"
          }
        },
        {
          $addFields: {
            options: {
              $map: {
                input: "$options",
                as: "opt",
                in: {
                  is_preselected: "$$opt.is_preselected",
                  position: "$$opt.position",
                  name: "$$opt.name",
                  slug: "$$opt.slug",
                  value: "$$opt.value",
                  attribute: {
                    $let: {
                      vars: {
                        foundAttribute: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$allAttributes",
                                as: "attr",
                                cond: {
                                  $eq: ["$$attr._id", "$$opt.attribute"]
                                }
                              }
                            },
                            0
                          ]
                        }
                      },
                      in: {
                        _id: "$$foundAttribute._id",
                        is_preselected: "$$foundAttribute.is_preselected",
                        name: "$$foundAttribute.name",
                        slug: "$$foundAttribute.slug",
                        position: "$$foundAttribute.position",
                        description: "$$foundAttribute.description",
                        value_type: "$$foundAttribute.value_type",
                        created: "$$foundAttribute.created",
                        value: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$$foundAttribute.values",
                                as: "val",
                                cond: {
                                  $eq: ["$$val.slug", "$$opt.slug"]
                                }
                              }
                            },
                            0
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            sides: 1,
            image_uris: 1,
            retail_price: 1,
            sale_price: 1,
            base_cost: 1,
            currency: 1,
            sku: 1,
            sku_seller: 1,
            is_default: 1,
            is_active: 1,
            created: 1,
            options: 1
          }
        }
      ],
      as: "source_variant"
    }
  },
  
  {
    $unwind: {
      path: "$source_variant",
      preserveNullAndEmptyArrays: true
    }
  },
  
  {
    $project: {
      "_id": 1,
      "order": 1,
      "mismatched_variants": {
        $map: {
          input: {
            $filter: {
              input: {
                $objectToArray: {
                  "sale_price": {
                    "source": "$source_variant.sale_price",
                    "captured": "$captured_variant.sale_price",
                    "match": { $eq: ["$source_variant.sale_price", "$captured_variant.sale_price"] }
                  },
                  "base_cost": {
                    "source": "$source_variant.base_cost",
                    "captured": "$captured_variant.base_cost",
                    "match": { $eq: ["$source_variant.base_cost", "$captured_variant.base_cost"] }
                  },
                  "sides": {
                    "source": { $arrayElemAt: ["$source_variant.sides", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.sides", 0] },
                    "match": { $eq: ["$source_variant.sides", "$captured_variant.sides"] }
                  },
                  "image_uris": {
                    "source": "$source_variant.image_uris",
                    "captured": "$captured_variant.image_uris",
                    "match": { $eq: ["$source_variant.image_uris", "$captured_variant.image_uris"] }
                  },
                  "retail_price": {
                    "source": "$source_variant.retail_price",
                    "captured": "$captured_variant.retail_price",
                    "match": { $eq: ["$source_variant.retail_price", "$captured_variant.retail_price"] }
                  },
                  "is_default": {
                    "source": "$source_variant.is_default",
                    "captured": "$captured_variant.is_default",
                    "match": { $eq: ["$source_variant.is_default", "$captured_variant.is_default"] }
                  },
                  "is_active": {
                    "source": "$source_variant.is_active",
                    "captured": "$captured_variant.is_active",
                    "match": { $eq: ["$source_variant.is_active", "$captured_variant.is_active"] }
                  },
                  "variant_id": {
                    "source": "$source_variant._id",
                    "captured": "$captured_variant.variant_id",
                    "match": { $eq: ["$source_variant._id", "$captured_variant.variant_id"] }
                  },
                  "currency": {
                    "source": "$source_variant.currency",
                    "captured": "$captured_variant.currency",
                    "match": { $eq: ["$source_variant.currency", "$captured_variant.currency"] }
                  },
                  "options_is_preselected": {
                    "source": { $arrayElemAt: ["$source_variant.options.is_preselected", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.is_preselected", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.is_preselected", 0] },
                      { $arrayElemAt: ["$captured_variant.options.is_preselected", 0] }
                    ]}
                  },
                  "options_position": {
                    "source": { $arrayElemAt: ["$source_variant.options.position", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.position", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.position", 0] },
                      { $arrayElemAt: ["$captured_variant.options.position", 0] }
                    ]}
                  },
                  "options_slug": {
                    "source": { $arrayElemAt: ["$source_variant.options.slug", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.slug", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.slug", 0] },
                      { $arrayElemAt: ["$captured_variant.options.slug", 0] }
                    ]}
                  },
                  "options_name": {
                    "source": { $arrayElemAt: ["$source_variant.options.name", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.name", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.name", 0] },
                      { $arrayElemAt: ["$captured_variant.options.name", 0] }
                    ]}
                  },
                  "options_value": {
                    "source": { $arrayElemAt: ["$source_variant.options.value", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.value", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.value", 0] },
                      { $arrayElemAt: ["$captured_variant.options.value", 0] }
                    ]}
                  },
                  "title": {
                    "source": "$source_variant.title",
                    "captured": "$captured_variant.title",
                    "match": { $eq: ["$source_variant.title", "$captured_variant.title"] }
                  },
                  "sku": {
                    "source": "$source_variant.sku",
                    "captured": "$captured_variant.sku",
                    "match": { $eq: ["$source_variant.sku", "$captured_variant.sku"] }
                  },
                  "sku_seller": {
                    "source": "$source_variant.sku_seller",
                    "captured": "$captured_variant.sku_seller",
                    "match": { $eq: ["$source_variant.sku_seller", "$captured_variant.sku_seller"] }
                  }
                }
              },
              as: "item",
              cond: { $eq: ["$$item.v.match", false] }
            }
          },
          as: "mismatch",
          in: {
            field: "$$mismatch.k",
            source_value: "$$mismatch.v.source",
            captured_value: "$$mismatch.v.captured"
          }
        }
      },
      "mismatched_attributes": {
        $map: {
          input: {
            $filter: {
              input: {
                $objectToArray: {
                  "attr_is_preselected": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.is_preselected", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.is_preselected", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.is_preselected", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.is_preselected", 0] }
                    ]}
                  },
                  "attr_name": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.name", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.name", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.name", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.name", 0] }
                    ]}
                  },
                  "attr_slug": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.slug", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.slug", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.slug", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.slug", 0] }
                    ]}
                  },
                  "attr_position": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.position", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.position", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.position", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.position", 0] }
                    ]}
                  },
                  "attr_description": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.description", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.description", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.description", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.description", 0] }
                    ]}
                  },
                  "attr_value_type": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.value_type", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.value_type", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.value_type", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.value_type", 0] }
                    ]}
                  },
                  "attr_value": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.value", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.value", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.value", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.value", 0] }
                    ]}
                  },
                  "attr_created": {
                    "source": { $arrayElemAt: ["$source_variant.options.attribute.created", 0] },
                    "captured": { $arrayElemAt: ["$captured_variant.options.attribute.created", 0] },
                    "match": { $eq: [
                      { $arrayElemAt: ["$source_variant.options.attribute.created", 0] },
                      { $arrayElemAt: ["$captured_variant.options.attribute.created", 0] }
                    ]}
                  }
                }
              },
              as: "item",
              cond: { $eq: ["$$item.v.match", false] }
            }
          },
          as: "mismatch",
          in: {
            field: "$$mismatch.k",
            source_value: "$$mismatch.v.source",
            captured_value: "$$mismatch.v.captured"
          }
        }
      }
    }
  }
])
// query kiểm tra đủ các field cũ trong orderitems
db = db.getSiblingDB("db-3bp");
db.orderitems.aggregate([
  {
    $match: {
      "order": ObjectId("1234")
    }
  },
  {
    $project: {
      "_id": 1,
      "order": 1,
      "missing_fields": {
        $map: {
          input: {
            $filter: {
              input: {
                $objectToArray: {
                  "currency": { $ne: [{ $type: "$currency" }, "missing"] },
                  "quantity": { $ne: [{ $type: "$quantity" }, "missing"] },
                  "status": { $ne: [{ $type: "$status" }, "missing"] },
                  "customizes": { $ne: [{ $type: "$customizes" }, "missing"] },
                  "artworks": { $ne: [{ $type: "$artworks" }, "missing"] },
                  "processed_artworks": { $ne: [{ $type: "$processed_artworks" }, "missing"] },
                  "processed_artworks_detail": { $ne: [{ $type: "$processed_artworks_detail" }, "missing"] },
                  "ffm_map_item_status": { $ne: [{ $type: "$ffm_map_item_status" }, "missing"] },
                  "generated_mockups": { $ne: [{ $type: "$generated_mockups" }, "missing"] },
                  "order": { $ne: [{ $type: "$order" }, "missing"] },
                  "product": { $ne: [{ $type: "$product" }, "missing"] },
                  "variant": { $ne: [{ $type: "$variant" }, "missing"] },
                  "updated": { $ne: [{ $type: "$updated" }, "missing"] },
                  "meta": { $ne: [{ $type: "$meta" }, "missing"] },
                  "meta_properties": { $ne: [{ $type: "$meta.properties" }, "missing"] },
                  "meta_is_external_personalized_item": { $ne: [{ $type: "$meta.is_external_personalized_item" }, "missing"] },
                  "estimated_base_cost": { $ne: [{ $type: "$estimated_base_cost" }, "missing"] },
                  "created": { $ne: [{ $type: "$created" }, "missing"] },
                  "__v": { $ne: [{ $type: "$__v" }, "missing"] }
                }
              },
              as: "item",
              cond: { $eq: ["$$item.v", false] }
            }
          },
          as: "missing",
          in: "$$missing.k"
        }
      },
      
      
      // === ACTUAL VALUES ===
      "actual_values": {
        "currency": "$currency",
        "quantity": "$quantity",
        "status": "$status",
        "customizes": "$customizes",
        "artworks": "$artworks",
        "processed_artworks": "$processed_artworks",
        "processed_artworks_detail": "$processed_artworks_detail",
        "ffm_map_item_status": "$ffm_map_item_status",
        "generated_mockups": "$generated_mockups",
        "order": "$order",
        "product": "$product",
        "variant": "$variant",
        "updated": "$updated",
        "meta": "$meta",
        "estimated_base_cost": "$estimated_base_cost",
        "created": "$created",
        "__v": "$__v"
      }
    }
  }
])
