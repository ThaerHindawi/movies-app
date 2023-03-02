import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import moviesAppLogo from "../../../assets/images/moviesapp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navValues = ["Home", "Newest", "Best"];


function Navbar() {
  const nav = useRef(null);
  const menu = useRef(null);
  const search = useRef(null);
  const form = useRef(null);
  const [query, setQuery] = useState(''); 
  const navigate = useNavigate(); 
  useEffect(() => {
    console.log("first");
    window.addEventListener("scroll", function() {
      if (
        document.body.scrollTop >= 2 ||
        document.documentElement.scrollTop >= 2
      ) {
        nav.current.classList.add("nav-colored");
        nav.current.classList.remove("nav-transparent");
      } else {
        nav.current.classList.add("nav-transparent");
        nav.current.classList.remove("nav-colored");
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        console.log("scroll removed");
      });
    };
  }, []);

  function openMenu() {
    menu.current.setAttribute("data-state", "opened");
  }

  function closeMenu() {
    menu.current.setAttribute("data-state", "closing");

    menu.current.addEventListener(
      "animationend",
      () => {
        menu.current.setAttribute("data-state", "closed");
      },
      { once: true }
    );
  }

  function toggleMenu() {
    if(!form.current.classList.contains('hide')) {
      form.current.classList.add('hide');
    }
    const isOpened = menu.current.getAttribute("data-state") === "opened";
    isOpened ? closeMenu() : openMenu();
  }

  function toggleSearch() {
    if(menu.current.getAttribute("data-state") === "opened") {
      closeMenu()
    }
    if(!form.current.classList.toggle('hide')) search.current.focus();
  }

 

  function handleChange(event) {
    setQuery(event.target.value);
  } 

  function searchMovie(event) {
    event.preventDefault();
    console.log(query);
    navigate(`/search?q=${query}&page=1`);
  }

  return (
    <header>
      <nav ref={nav} className="nav">
        <div className="prand-icon">
          <a href="#">
            <img
              className="prand-icon_image"
              src={moviesAppLogo}
              alt="Movies-app"
            />
          </a>
        </div>
        <button onClick={toggleMenu} type="button" id="icon" className="icon">
          <FontAwesomeIcon icon={Icons.faBars} />
        </button>
        <button type="button" onClick={toggleSearch} id="search-icon" className="search-icon">
          <FontAwesomeIcon icon={Icons.faSearch} />
        </button>
        <ul data-state="closed" ref={menu} id="menu" className="menu">
          {navValues.map((nanValue) => {
            return (
              <li className="menu-item" key={nanValue}>
                <NavLink to={nanValue === 'Home' ? '/Home' : `?sort_by=${nanValue}`}>{nanValue}</NavLink>
                {/* <a href="#">{nanValue}</a> */}
              </li>
            );
          })}
        </ul>
        <form onSubmit={searchMovie} ref={form} id="form" className="hide">
          <input
          ref={search}
            type="text"
            id="search"
            className="search"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />
          <button className="search-btn"><FontAwesomeIcon icon={Icons.faSearch} /></button>
        </form>
      </nav>
    </header>
  );
}
export default Navbar;
