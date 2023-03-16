import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";;

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { DUMMY_USER } from "../../constants";
import { UserDataType } from "../../types";

const Navbar: React.FC = () => {
  const [userDataState, setUserDataState] = useState<UserDataType | null>(null);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData: UserDataType | null = JSON.parse(
        localStorage.getItem("userData") || null
      );

      if (userData) {
        setUserDataState(userData);
      }
    }
  }, []);

  const handleUserData = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      localStorage.setItem("userData", JSON.stringify(DUMMY_USER));
      setUserDataState(DUMMY_USER);
      setLoadingLogin(false);
      Router.reload();
    }, 800);
  };

  return (
    <div className="navbar-comp">
      <Link href="/" prefetch={false}>
        <h1 className="navbar-comp-title">Movie SPOT!</h1>
      </Link>
      <div className="navbar-comp-routing">
        <Link href="/popular" prefetch={false}>
          <div className="navbar-comp-routing-button">
            <p>Popular</p>
          </div>
        </Link>
        <Link href="/top-rated" prefetch={false}>
          <div className="navbar-comp-routing-button">
            <p>Top Rated</p>
          </div>
        </Link>
        {userDataState ? (
          <Link href="/user" prefetch={false}>
            <div className="navbar-comp-routing-user-detail">
              <p>{userDataState?.username}</p>
              <p>{userDataState?.email}</p>
            </div>
          </Link>
        ) : (
          <div className="navbar-comp-routing-login">
            {loadingLogin ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <Button onClick={() => handleUserData()} size="lg">
                LOGIN
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
