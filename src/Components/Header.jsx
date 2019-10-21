import React from 'react';

const Header = () => {
    return (
      <nav className="navbar header">
        <a href="/" className="navbar-brand logo">PetCall</a>
        <span>
          <a href="" className="auth">
            Login
          </a>
          <a href="" className="auth">
            Register
          </a>
        </span>
      </nav>
    );
}
 
export default Header;