import React, { useEffect, useState } from "react";
import UserHeader from "../Layouts/SubLayout/UserHeader";
import Footer from "../Layouts/SubLayout/Footer";

const Ecommerce = () => {
  return (
    <div className="wrapper">
      <div className="main-sec-content" >
        <UserHeader />
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
