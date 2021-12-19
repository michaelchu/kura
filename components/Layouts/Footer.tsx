export default function Footer() {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ms-lg-auto">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                <a href="#" className="link-secondary">
                  Company
                </a>
              </li>
              <li className="list-inline-item">
                <a href="mailto:hello@goldspanlabs.com" className="link-secondary">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Copyright &copy; 2021 Goldspan Labs Inc.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
