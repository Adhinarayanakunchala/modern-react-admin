import "./pageNotFound.css";
import { Link } from "react-router-dom";
function PageNotFound() {
    return (
        <>
            <div className="not-found">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist</p>
                <Link to="/">Go back to home page</Link>
            </div>
        </>
    );
}

export default PageNotFound;
