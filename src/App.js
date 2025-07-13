import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";

// --------------pages -----------------------------
import useStore from "./store";
import Router from "Routes/routes";
import AccessDenied from "./pages/AccessDenied/Popup";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "Util/ScrollToTop";
import Aos from "aos";
import "aos/dist/aos.css";
Aos.init();
function App() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
