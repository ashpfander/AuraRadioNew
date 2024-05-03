import Navbar from './Navbar';

function Header() {
  return (
    <header className="ps-4">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid d-flex align-items-center">
          <a href="/" className="home-link"><h1>Aura Radio ၊၊||၊၊၊||၊၊၊||၊</h1></a>
          <Navbar />
        </div>
      </nav>
    </header>
  );
}

export default Header;