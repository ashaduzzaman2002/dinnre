import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { CloseBtn, MenuBar } from "../../assets/svg/Icon";
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
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog m-0">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="mb-0 menuHeading">Menu</h2>
              <button
                type="button"
                className="btnClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <CloseBtn />
              </button>
            </div>
            <div className="modal-body">
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
            <MenuBar />
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
