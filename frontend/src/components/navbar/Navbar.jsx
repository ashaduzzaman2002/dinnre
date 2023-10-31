import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = ({ navLinks, type }) => {
  const { pathname } = window.location;
  const [activeLink, setActiveLink] = useState(pathname);
  const navigate = useNavigate();
  const { cities } = useContext(AppContext);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div>
      {/* Mobile menu */}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog m-0">
          <div class="modal-content">
            <div class="modal-header">
              <h2 className="mb-0 menuHeading">Menu</h2>
              <button
                type="button"
                class="btnClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M5.91614 5.0078L9.81 1.11387C10.0634 0.86058 10.0634 0.451037 9.81 0.197779C9.55672 -0.0555096 9.14717 -0.0555096 8.89391 0.197779L4.99995 4.09168L1.10615 0.197779C0.852737 -0.0555096 0.443346 -0.0555096 0.190057 0.197779C-0.0633525 0.451067 -0.0633525 0.86058 0.190057 1.11387L4.08383 5.0078L0.190088 8.9017C-0.0633221 9.15498 -0.0633221 9.56453 0.190088 9.81778C0.250169 9.87804 0.321564 9.92582 0.40017 9.9584C0.478776 9.99097 0.563044 10.0077 0.648133 10.0076C0.813955 10.0076 0.979837 9.94413 1.10618 9.81778L4.99995 5.92389L8.89391 9.81778C8.954 9.87803 9.0254 9.92581 9.104 9.95838C9.18261 9.99095 9.26687 10.0077 9.35196 10.0076C9.51778 10.0076 9.68366 9.94413 9.81 9.81778C10.0634 9.5645 10.0634 9.15498 9.81 8.9017L5.91614 5.0078Z"
                    fill="#BE2AED"
                  />
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <ul className="navbar-nav d-flex">
                {navLinks.map((item, i) => (
                  <NavLink
                    key={i}
                    navigate={navigate}
                    setActiveLink={setActiveLink}
                    activeLink={activeLink}
                    link={item.path}
                    title={item.title}
                  />
                ))}

                <li class="dropdown d-flex align-items-center mt-3">
                  <div
                    class="menu-dropdown dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    City
                  </div>
                  <ul class="dropdown-menu">
                    {cities?.map((item, i) => (
                      <li>
                        <p class="dropdown-item mb-0">Kolkata</p>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <nav className="d-flex">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Mobile view */}
          <button
            className="nav-menu-btn mobile-view "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clip-path="url(#clip0_193_51224)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 2.58696C0 2.26279 0.272259 2 0.608108 2H13.3919C13.7277 2 14 2.26279 14 2.58696C14 2.91112 13.7277 3.17391 13.3919 3.17391H0.608108C0.272259 3.17391 0 2.91112 0 2.58696ZM0 6.5C0 6.17583 0.272259 5.91304 0.608108 5.91304H8.09459C8.43044 5.91304 8.7027 6.17583 8.7027 6.5C8.7027 6.82417 8.43044 7.08696 8.09459 7.08696H0.608108C0.272259 7.08696 0 6.82417 0 6.5ZM0 10.413C0 10.0889 0.272259 9.82609 0.608108 9.82609H10.527C10.8629 9.82609 11.1351 10.0889 11.1351 10.413C11.1351 10.7372 10.8629 11 10.527 11H0.608108C0.272259 11 0 10.7372 0 10.413Z"
                  fill="#464255"
                  stroke="#464255"
                  stroke-width="0.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_193_51224">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

          <div className="d-flex align-items-center gap-5">
            <Link onClick={() => setActiveLink("/")} to="/" className="brand">
              <img src="/images/logo.svg" alt="logo" />
            </Link>

            {/* Desktop view */}
            <ul className="navbar-nav desktop-view d-flex flex-row">
              {navLinks.map((item, i) => (
                <li key={i} className="nav-item position-relative">
                  <Link
                    onClick={() => setActiveLink(item.path)}
                    to={item.path}
                    className={`nav-link ${
                      activeLink === item.path && "active-nav-link"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              <li class="dropdown d-flex align-items-center">
                <div
                  class="menu-dropdown dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  City
                </div>
                <ul class="dropdown-menu">
                  {cities?.map((item, i) => (
                    <li key={i}>
                      <p class="dropdown-item mb-0 text-capitalize">
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-flex gap-md-4">
            <input
              className="search-box desktop-view"
              placeholder="Search here"
              type="text"
              name=""
              id=""
            />

            <button className="mobile-view search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.6744 7.97674C10.5277 7.97674 7.97674 10.5277 7.97674 13.6744C7.97674 16.8212 10.5277 19.3721 13.6744 19.3721C16.8212 19.3721 19.3721 16.8212 19.3721 13.6744C19.3721 10.5277 16.8212 7.97674 13.6744 7.97674ZM7 13.6744C7 9.98824 9.98824 7 13.6744 7C17.3606 7 20.3488 9.98824 20.3488 13.6744C20.3488 15.3417 19.7375 16.8663 18.7267 18.036L20.857 20.1663C21.0477 20.357 21.0477 20.6662 20.857 20.857C20.6662 21.0477 20.357 21.0477 20.1663 20.857L18.036 18.7267C16.8663 19.7375 15.3417 20.3488 13.6744 20.3488C9.98824 20.3488 7 17.3606 7 13.6744Z"
                  fill="#1C274C"
                />
              </svg>
            </button>
            <button className="cart-menu" onClick={() => navigate("/cart")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.87526 5.84455C6.8752 5.84082 6.87516 5.83708 6.87516 5.83333V5C6.87516 3.27411 8.27427 1.875 10.0002 1.875C11.7261 1.875 13.1252 3.27411 13.1252 5V5.83333C13.1252 5.83708 13.1251 5.84082 13.1251 5.84455C14.2062 5.87479 14.8647 5.98661 15.3689 6.39998C16.0601 6.96662 16.2525 7.92867 16.6374 9.85275L17.1374 12.3528C17.6908 15.1198 17.9675 16.5033 17.2173 17.4183C16.4672 18.3333 15.0563 18.3333 12.2345 18.3333H7.76583C4.94402 18.3333 3.53311 18.3333 2.78297 17.4183C2.03282 16.5033 2.30952 15.1198 2.86293 12.3528L3.36293 9.85275C3.74775 7.92867 3.94015 6.96662 4.63135 6.39998C5.13559 5.9866 5.79411 5.87479 6.87526 5.84455ZM8.12516 5C8.12516 3.96447 8.96463 3.125 10.0002 3.125C11.0357 3.125 11.8752 3.96447 11.8752 5V5.83333C11.8752 5.83333 11.8752 5.83334 11.8752 5.83333C11.8288 5.83333 11.7819 5.83333 11.7345 5.83333H8.26583C8.21837 5.83333 8.17148 5.83333 8.12516 5.83334C8.12516 5.83334 8.12516 5.83334 8.12516 5.83334V5ZM10.0005 14.375C9.18507 14.375 8.4897 13.8541 8.23201 13.1251C8.11698 12.7996 7.7599 12.629 7.43445 12.7441C7.109 12.8591 6.93843 13.2162 7.05346 13.5416C7.48215 14.7545 8.63886 15.625 10.0005 15.625C11.3621 15.625 12.5188 14.7545 12.9475 13.5416C13.0625 13.2162 12.8919 12.8591 12.5665 12.7441C12.2411 12.629 11.884 12.7996 11.7689 13.1251C11.5113 13.8541 10.8159 14.375 10.0005 14.375Z"
                  fill="#1C274C"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavLink = ({ setActiveLink, activeLink, link, title, navigate }) => (
  <li className="nav-item position-relative">
    <Link
      onClick={() => {
        setActiveLink(link);
        navigate(link);
      }}
      to={link}
      className={`nav-link ${activeLink === link && "active-nav-link"}`}
      data-bs-dismiss="modal"
      aria-label="Close"
    >
      {title}
    </Link>
  </li>
);

export default Navbar;
