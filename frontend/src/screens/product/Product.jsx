import React from 'react'
import Layout from '../../layout/Layout'
import ProductCard from '../../components/product/ProductCard'

const Product = () => {
  return (
    <Layout title="Product">
        <div className='container mt-5'>
        <div className='page-heading d-flex justify-content-between'>
          <h2>All Popular Items</h2>
        </div>

        <div className='d-flex flex-wrap justify-content-center products' style={{marginTop: '30px', gap: '20px'}}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <hr className='mt-5' />
      </div>
    </Layout>
  )
}

export default Product