import React from 'react';
import './404page.css'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
      <div class="container d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
        <div class="row" style={{width: '100%'}}>
          <div class="col-lg-8 offset-lg-2 text-center">
            <div class="error-text">
              <i class="bi bi-emoji-frown"></i>
              <h1>Oops! Not Found.</h1>
              <p>The page you requested for is not found.</p>
              <Link to="/" class="boxed-btn">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NotFoundPage;
