import React from 'react';
import AdminRoute from '../../../routes/AdminRoute';

const AdminDash = () => {
  return (
    <AdminRoute>
    <div className="restaurant-dash" style={{minHeight: '100vh', backgroundColor: 'red'}}>
      <div class="container" style={{ paddingTop: '6rem' }}>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div class="row"></div>
      </div>
    </div>
    </AdminRoute>
  );
};

export default AdminDash;
