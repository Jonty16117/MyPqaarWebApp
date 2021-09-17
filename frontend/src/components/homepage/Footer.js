import React from "react";

const Footer = () => {
  return (
    <div className="d-flex flex-column">
      <footer
        className="footer"
        style={{
          bottom: "0",
          width: '100%',
        }}
      >
        <a href="https://pqaar.herokuapp.com">
          <p>Pqaar</p>
        </a>
        <p>&copy; 2021 GNU GPLv3 Liscensed.</p>
        <p>Powered by ReactJs</p>
      </footer>
    </div>
  );
};

export default Footer;
