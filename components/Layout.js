import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./Navbar/NavBar";

const Layout = ({ children }) => (
  <div>
    <Header />
    <div className="page">
      <NavBar />
      <div className="content">
        <div className="container-xl">{children}</div>
        <Footer />
      </div>
    </div>
  </div>
);

export default Layout;
