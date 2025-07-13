import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import Payments from "./Payments";
function Tutor() {
    const Navigate = useNavigate();
    return (
        <Layout Active={"Payments"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Payments</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>
                <div className={CommonClasses["wrapper"]}>
                    <h3>Payment Details</h3>
                    <Payments />
                </div>
            </div>
        </Layout>
    );
}
export default Tutor;
