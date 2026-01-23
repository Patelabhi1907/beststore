import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../features/productsSlice'
import ProductList from '../components/ProductList'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  )
}

export default ProductsPage
