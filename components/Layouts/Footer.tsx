const Footer = () => (
  <footer className="footer footer-transparent d-print-none">
    <div className="container">
      <div className="row text-center align-items-center flex-row-reverse">
        <div className="col-lg-auto ms-lg-auto">
          <ul className="list-inline list-inline-dots mb-0">
            <li className="list-inline-item">
              <a href="./docs/index.html" className="link-secondary">
                Company
              </a>
            </li>
            <li className="list-inline-item">
              <a href="./license.html" className="link-secondary">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul className="list-inline list-inline-dots mb-0">
            <li className="list-inline-item">
              Copyright &copy; 2021 Zen Labs Inc.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
