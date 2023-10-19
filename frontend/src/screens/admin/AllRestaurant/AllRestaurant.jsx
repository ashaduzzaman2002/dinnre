import React, { useState } from 'react';
import AdminRoute from '../../../routes/AdminRoute';

const AllRestaurant = () => {
    const rawdata = [
        {
          Name: 'Tiger Nixon',
          Position: 'System Architect',
          Office: 'Edinburgh',
          Age: 61,
          Start: '2011/04/25',
          Salary: '$320,800',
        },
        {
          Name: 'Garrett Winters',
          Position: 'Accountant',
          Office: 'Tokyo',
          Age: 63,
          Start: '2011/07/25',
          Salary: '$170,750',
        },
        {
          Name: 'Ashton Cox',
          Position: 'Junior Technical Author',
          Office: 'San Francisco',
          Age: 66,
          Start: '2009/01/12',
          Salary: '$86,000',
        },
        {
          Name: 'Cedric Kelly',
          Position: 'Senior Javascript Developer',
          Office: 'Edinburgh',
          Age: 22,
          Start: '2012/03/29',
          Salary: '$433,060',
        },
        {
          Name: 'Airi Satou',
          Position: 'Accountant',
          Office: 'Tokyo',
          Age: 33,
          Start: '2008/11/28',
          Salary: '$162,700',
        },
        {
          Name: 'Brielle Williamson',
          Position: 'Integration Specialist',
          Office: 'New York',
          Age: 61,
          Start: '2012/12/02',
          Salary: '$372,000',
        },
        {
          Name: 'Herrod Chandler',
          Position: 'Sales Assistant',
          Office: 'San Francisco',
          Age: 59,
          Start: '2012/08/06',
          Salary: '$137,500',
        },
        {
          Name: 'Rhona Davidson',
          Position: 'Integration Specialist',
          Office: 'Tokyo',
          Age: 55,
          Start: '2010/10/14',
          Salary: '$327,900',
        },
        {
          Name: 'Colleen Hurst',
          Position: 'Javascript Developer',
          Office: 'San Francisco',
          Age: 39,
          Start: '2009/09/15',
          Salary: '$205,500',
        },
        {
          Name: 'Sonya Frost',
          Position: 'Software Engineer',
          Office: 'Edinburgh',
          Age: 23,
          Start: '2008/12/13',
          Salary: '$103,600',
        },
        {
          Name: 'Jena Gaines',
          Position: 'Office Manager',
          Office: 'London',
          Age: 30,
          Start: '2008/12/19',
          Salary: '$90,560',
        },
        {
          Name: 'Quinn Flynn',
          Position: 'Support Lead',
          Office: 'Edinburgh',
          Age: 22,
          Start: '2013/03/03',
          Salary: '$342,000',
        },
        {
          Name: 'Charde Marshall',
          Position: 'Regional Director',
          Office: 'San Francisco',
          Age: 36,
          Start: '2008/10/16',
          Salary: '$470,600',
        },
        {
          Name: 'Haley Kennedy',
          Position: 'Senior Marketing Designer',
          Office: 'London',
          Age: 43,
          Start: '2012/12/18',
          Salary: '$313,500',
        },
        {
          Name: 'Tatyana Fitzpatrick',
          Position: 'Regional Director',
          Office: 'London',
          Age: 19,
          Start: '2010/03/17',
          Salary: '$385,750',
        },
        {
          Name: 'Michael Silva',
          Position: 'Marketing Designer',
          Office: 'London',
          Age: 66,
          Start: '2012/11/27',
          Salary: '$198,500',
        },
        {
          Name: 'Paul Byrd',
          Position: 'Chief Financial Officer (CFO)',
          Office: 'New York',
          Age: 64,
          Start: '2010/06/09',
          Salary: '$725,000',
        },
        {
          Name: 'Gloria Little',
          Position: 'Systems Administrator',
          Office: 'New York',
          Age: 59,
          Start: '2009/04/10',
          Salary: '$237,500',
        },
        {
          Name: 'Bradley Greer',
          Position: 'Software Engineer',
          Office: 'London',
          Age: 41,
          Start: '2012/10/13',
          Salary: '$132,000',
        },
        {
          Name: 'Dai Rios',
          Position: 'Personnel Lead',
          Office: 'Edinburgh',
          Age: 35,
          Start: '2012/09/26',
          Salary: '$217,500',
        },
        {
          Name: 'Jenette Caldwell',
          Position: 'Development Lead',
          Office: 'New York',
          Age: 30,
          Start: '2011/09/03',
          Salary: '$345,000',
        },
        {
          Name: 'Yuri Berry',
          Position: 'Chief Marketing Officer (CMO)',
          Office: 'New York',
          Age: 40,
          Start: '2009/06/25',
          Salary: '$675,000',
        },
        {
          Name: 'Caesar Vance',
          Position: 'Pre-Sales Support',
          Office: 'New York',
          Age: 21,
          Start: '2011/12/12',
          Salary: '$106,450',
        },
        {
          Name: 'Doris Wilder',
          Position: 'Sales Assistant',
          Office: 'Sidney',
          Age: 23,
          Start: '2010/09/20',
          Salary: '$85,600',
        },
        {
          Name: 'Angelica Ramos',
          Position: 'Chief Executive Officer (CEO)',
          Office: 'London',
          Age: 47,
          Start: '2009/10/09',
          Salary: '$1,200,000',
        },
      ];
    
      const [searchTerm, setSearchTerm] = useState('');
      const [data, setData] = useState(rawdata);
    
      const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    
        const results = rawdata.filter((employee) =>
          employee.Name.toLowerCase().includes(value.toLowerCase())
        );
    
        setData(results);
      };


  return (
    <AdminRoute>
      <div className="restaurant-dash">

<div className="container" style={{ paddingTop: '6rem' }}>
  <div class="container-fluid">
    <h1 class="h3 mb-2 text-gray-800">Tables</h1>
    <p class="mb-4">
      DataTables is a third party plugin that is used to generate the
      demo table below. For more information about DataTables, please
      visit the{' '}
      <a target="_blank" href="https://datatables.net">
        official DataTables documentation
      </a>
      .
    </p>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">
          DataTables Example
        </h6>
      </div>

      <div class="row mt-3 mx-1">
        
        <div class="col-sm-12 col-md-6">
          <div id="dataTable_filter" class="dataTables_filter">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              class="form-control form-control-sm"
              placeholder="Search..."
              aria-controls="dataTable"
            />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start Date</th>
                <th>Salary</th>
              </tr>
            </thead>

            <tbody>
              {data?.length
                ? data.map((item, i) => (
                    <tr key={i}>
                      <td>{item.Name}</td>
                      <td>{item.Position}</td>
                      <td>{item.Office}</td>
                      <td>{item.Age}</td>
                      <td>{item.Start}</td>
                      <td>{item.Salary}</td>
                    </tr>
                  ))
                : 'No data found'}
            </tbody>
          </table>
        </div>
      </div>

   
    </div>
  </div>
</div>
</div>
    </AdminRoute>
  );
};

export default AllRestaurant;
