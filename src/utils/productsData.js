// Utility functions for managing product data with RxDB

import { createRxDatabase, addRxPlugin } from 'rxdb'
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

// Add the localStorage plugin
addRxPlugin(getRxStorageLocalstorage)
addRxPlugin(RxDBDevModePlugin)

const productSchema = {
  title: 'product schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    title: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    description: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    rating: {
      type: 'object',
      properties: {
        rate: {
          type: 'number'
        },
        count: {
          type: 'number'
        }
      }
    }
  },
  required: ['id', 'title', 'price', 'description', 'category', 'image', 'rating']
}

let db = null

const initDB = async () => {
  if (db) return db
  db = await createRxDatabase({
    name: 'productsdb',
    storage: getRxStorageLocalstorage()
  })
  await db.addCollections({
    products: {
      schema: productSchema
    }
  })
  // Load initial data if not already loaded
  const existingProducts = await db.products.find().exec()
  if (existingProducts.length === 0) {
    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json()
    await db.products.bulkInsert(products)
  }
  return db
}

export const loadProducts = async () => {
  const database = await initDB()
  const products = await database.products.find().exec()
  return products.map(doc => doc.toJSON())
}
