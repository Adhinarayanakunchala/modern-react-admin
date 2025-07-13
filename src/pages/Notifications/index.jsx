import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import Notification from "./Notification";
function Tutor() {
    const Navigate = useNavigate();
    return (
        <Layout Active={"Notifications"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Notifications</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>
                <div className={CommonClasses["wrapper"]}>
                    <h3>Send Notifications</h3>
                    <Notification />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
