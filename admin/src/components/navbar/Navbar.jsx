import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
// import { AppContext } from "../../context/AppContext";

const Navbar = ({ navLinks, type }) => {
  const { pathname } = window.location;
  const [activeLink, setActiveLink] = useState(pathname);
  const navigate = useNavigate();
  //   const { loggout, user, cities } = useContext(AppContext);

  const loggout = () => {};

  const user = {};
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
            </ul>
          </div>

          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{user?.username}</strong>
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {user && (
                <li>
                  <button onClick={loggout} className="dropdown-item" href="#">
                    Sign out
                  </button>
                </li>
              )}
            </ul>
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
