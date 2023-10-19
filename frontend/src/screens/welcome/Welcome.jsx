import React from 'react'
import Layout from '../../layout/Layout'
import FFI from '../../assets/img/fastfood_icons.svg'
import { FastFoodIcons } from '../../assets/svg/SVG'
import './welcome.css'

const Welcome = () => {
  return (
    <Layout>
      <div className='wlc_container container  '>
        <div className="wlc_container_left col-md-6">
          <div className="wlc_left_top">
            <h1>Late Night at office?</h1>
            <span>Order food from favourite restaurants near you.</span>
          </div>
          <div className="wlc_left_bottom">
            <input type="text" name="" id="" placeholder='Enter your delivery location' />
            <div className="btn ">Find food</div>
          </div>
        </div>
        <div className="wlc_container_right col-md-6 h-50 w-50">
          <img src={FFI} alt="fast-food-icons"  />
        </div>
      </div>
    </Layout>
  )
}

export default Welcome