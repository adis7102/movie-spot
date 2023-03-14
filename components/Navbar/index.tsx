import React from "react";
import Link from "next/link";

const Navbar = () => {
  
  return (
    <div className="navbar-comp">
      <Link href="/" prefetch={false}>
        <h1 className="navbar-comp-title">Movie SPOT!</h1>
      </Link>
      <div className="navbar-comp-routing">
        <Link href="/popular" prefetch={false}>
          <div className="navbar-comp-routing-button">
            <p
              
            >Popular</p>
          </div>
        </Link>
        <Link href="/top-rated" prefetch={false}>
          <div className="navbar-comp-routing-button">
            <p
              
            >Top Rated</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
