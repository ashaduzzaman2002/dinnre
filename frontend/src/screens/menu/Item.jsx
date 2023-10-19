import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dbObject } from '../../helper/api';
import { AppContext } from '../../context/AppContext';

const Item = () => {
  const { item_id } = useParams();
  const [data, setData] = useState(null);

  const getItemDetails = async () => {
    try {
      const { data } = await dbObject.get(`/restaurants/food/items/${item_id}`);
      setData(data.food);
    } catch (error) {
      console.log(error);
    }
  };

  const { addToCart } = useContext(AppContext);

  const handleClick = () => {
   
    addToCart(data)
  };


  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <section className="restaurants">
      <div className="container px-md-5 px-4">
        {data ? (
          <div class="shopItemsModal row">
            <div class="col-md-6 image-modal">
              <img width={"100%"} src={data.img} />
              <span
                class="onsale mbr-fonts-style display-7"
                data-onsale="false"
                style={{ display: 'none' }}
              >
                -50%
              </span>
            </div>
            <div class="col-md-6 text-modal">
              <div class="sidebar_wraper">
                <h4 class="item-title mbr-fonts-style mbr-text display-5">
                  {data.name}
                </h4>
                <div class="price-block">
                  <span class="shop-item-price mbr-fonts-style display-5">
                  ₹ {data.price}
                  </span>
                  
                </div>
                <div class="card-description">
                  Casual shoes (contact us for sizing)
                  <br />
                  <br />
                  <ul>
                    <li>Lightweight textured fabric</li>{' '}
                    <li>Rounded v-neckline</li> <li>Pom pom trims</li>{' '}
                    <li>Regular fit – true to size</li>
                  </ul>{' '}
                  <br />
                  Duis auctor hendrerit nisi, at lacinia ex vulputate quis.
                  Suspendisse convallis iaculis tortor, quis mattis lectus
                  rutrum a.
                  <br />
                  <br />
                  
                </div>
                <div
                  class="mbr-section-btn"
                  buttons="0"
               
                >
                  <Link
                  onClick={handleClick}
                    class="btn btn-secondary display-7"
                    to="/cart"
                  >
                    Order now!
                  </Link>
                </div>
              </div>
            </div>
            <div class="closeModal">
              <div class="close-modal-wrapper"></div>
            </div>
          </div>
        ) : (
          <div className="container d-flex align-items-center justify-content-center mt-5">
            <div className="row" style={{ width: '100%' }}>
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="error-text">
                  <h1>Oops! Item Not Found.</h1>
                  <p>Search diffrent Item</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Item;
