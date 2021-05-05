import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="d-flex flex-column">
        <footer className="footer">
          <div>
            <a href="https://pqaar.herokuapp.com"><p>Pqaar</p></a>
            <p>&copy; 2021 GNU GPLv3 Liscensed.</p>
          </div>
          <div className="ml-auto">
            <p>Powered by ReactJs</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
