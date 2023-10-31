import React from 'react'
import './footer.css';
import { Facebook, FooterArrow, LinkedIn, Twitter, Youtube } from '../../assets/svg/SVG';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='mt-5 footer-container'>
      <div className='container pt-5'>
        <div className='row footer-top'>
          <div className='col-lg-3 col-md-3 col-12 p-md-0'>
            <div className='footer-logo'>
              <img src="/images/logo.svg" alt="logo" />
            </div>

            <p className='my-3'>Lorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem  ipsum dolor sit amet .</p>
            <div className='d-flex gap-2'>
              <LinkedIn />
              <Facebook />
              <Twitter />
              <Youtube />
            </div>
          </div>
          <div className='col-lg-2 col-md-3 col-4 d-flex justify-content-start justify-content-md-center p-md-0 pt-4 pt-md-0'>
            <div className='d-inline'>
              <h3 className='mb-3'>Quick Links</h3>
              <ul className='d-flex flex-column gap-3'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/item'}>Item</Link></li>
                <li><Link to={'/restaurants'}>Restaurants</Link></li>
              </ul>
            </div>
          </div>

          <div className='col-lg-2 col-md-3 col-4 d-flex justify-content-center p-md-0 pt-4 pt-md-0'>
            <div className='d-inline'>
              <h3 className='mb-3'>Contact</h3>
              <ul className='d-flex flex-column gap-3'>
                <li><Link to={'#'}>My Profile</Link></li>
                <li><Link to={'#'}>My Orders</Link></li>
                <li><Link to={'#'}>My Listing</Link></li>
                <li><Link to={'#'}>Add Listing</Link></li>
              </ul>
            </div>
          </div>

          <div className='col-lg-2 col-md-3 col-4 d-flex justify-content-end justify-content-md-center p-md-0 pt-4 pt-md-0'>
            <div className='d-inline'>
              <h3 className='mb-3'>More</h3>
              <ul className='d-flex flex-column gap-3'>
                <li><Link to={'#'}>About Us</Link></li>
                <li><Link to={'#'}>Privacy Policy</Link></li>
                <li><Link to={'#'}>Tearms & Condition</Link></li>
              </ul>
            </div>
          </div>

          <div className='col-lg-3 col-md-4 mt-md-4 '>
            <h3>Subscribe</h3>
            <div className='mt-3 footer-input row p-2 align-items-center justify-content-between m-1'>
              <input className='col-md-10 col-9 px-2' type="text" placeholder='Enter your email' />
              <div className='footer-arrow col-md-2 col-1'>
                <FooterArrow />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-bottom mt-4 py-2'>
        <div className='container'>
          <p className='mb-0 text-center'>© Copyright 2022 DUMMY. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer