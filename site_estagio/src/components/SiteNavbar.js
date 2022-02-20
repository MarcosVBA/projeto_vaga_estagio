import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function SiteNavbar(){
  return (
  <Navbar bg="light">
    <div className="logo-div mt-3">
      <Navbar.Brand href="#home">
        <img
          src="/logo_branco_horizontal.png"
          height="45"
          className="d-inline-block align-top"
          alt="Tebe Sensores"
        />
      </Navbar.Brand>
    </div>
  </Navbar>
  )
}

export default SiteNavbar;