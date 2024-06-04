import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="container">
      <div className="flex-column align-items-center d-flex content-wrapper w-50">
        <div className="jumbotron content">
          <h1 className="display-4">
            <i className="fas fa-bug"></i> Page not found
          </h1>
          <p className="lead">
            We're sorry! The page that you're looking for can't be found. Please go back to the home page.
          </p>
          <p className="lead">
            <Link to="/" className="btn btn-primary btn-lg" type="button">
              <i className="fas fa-backward"> Home Page</i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
