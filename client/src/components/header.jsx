import Navbar from './Navbar';
import "bootstrap/js/src/offcanvas.js";

function Header() {
  return (
    <header className="ps-4">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid d-flex align-items-center">
          <a href="/" className="home-link"><h1>Aura Radio ၊၊||၊၊၊||၊၊၊||၊</h1></a>
          {/* Creates a hamburger style button for navbar once it goes down to a certain viewport */}
          <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end justify-content-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h2 className="offcanvas-title pt-2 ps-3" id="offcanvasNavbarLabel">Aura Radio</h2>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr className="border-2"/>
            <div className="offcanvas-body justify-content-end">
              <Navbar />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;