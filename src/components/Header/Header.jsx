import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoren.png";
import "./header.css";
import { FaUser, FaCog, FaStore } from 'react-icons/fa';

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/product",
    display: "Product",
  },
];

const nav__links_admin = [
  {
    path: "/admin/product",
    display: "Product",
  },
  {
    path: "/admin/user",
    display: "User",
  },
  {
    path: "/admin/payment",
    display: "Payment",   
  },
];

const Header = () => {
  const navigasi = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [items, setItems] = useState(null);
  const [roll, setRoll] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const Logout = () => {
    localStorage.setItem("status", JSON.stringify(null));
    localStorage.setItem("username", JSON.stringify(null));
    localStorage.setItem("email", JSON.stringify(null));
    localStorage.setItem("id", JSON.stringify(null));
    setItems(null);

    setTimeout(() => {
      navigasi("/home");
    }, 100);
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    const roll = JSON.parse(localStorage.getItem("status"))
    if (username) {
      setItems(username);
      setRoll(roll);
    }
  }, []);

  const toggleMenu = ()=> menuRef.current.classList.toggle('show__menu')

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {roll === 'admin' ?
                 (
                  nav__links_admin.map((item, index) => {
                    return <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        end
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>})
                 ): roll === 'user' || roll === null || roll === '' ? 
                 (
                  nav__links.map((item, index) => {
                    return <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        end
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>})
                ): (
                  <li className="nav__item" key={'1'}>
                      <NavLink
                        HALO// to={item.path}
                        end
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        menu tidak ada
                      </NavLink>
                    </li>
                ) } 
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                  {items !== null ? (
                    <div className="dropdown-container" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                      <p className="profil_user" onClick={() => setShowDropdown(!showDropdown)}>{items}<i class="ri-arrow-down-s-line"></i></p>
                      {showDropdown && (
                        <div className="dropdown-content">
                          <Link to="/profile"><FaUser /> <span>Profile</span></Link>
                          <Link to="/settings"><FaCog /> <span>Pengaturan</span></Link>
                          <Link to="/tokosaya"><FaStore /> <span>Toko Saya</span></Link>
                          <div className="triangle"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                  {items !== null && ( 
                    <Button className="btn primary__btn" onClick={Logout}>
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;