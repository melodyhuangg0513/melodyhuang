
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <div className="NavBar">
           <nav className="navbar navbar-expand-lg nav-custom w-100">
              
                <a className="navbar-brand" href="#">Tartan-prep</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active" to="/">Home</Link>
                    </li>
                  </ul>
                </div>
         </nav>
    </div>
  );
}

export default NavBar;
