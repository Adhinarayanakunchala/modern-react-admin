import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import ReportedUsers from "./ReportedUsers";

function Tutor() {
    const Navigate = useNavigate();
    return (
        <Layout Active={"Reported Users"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reported Users</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>

                <div className={CommonClasses["wrapper"]}>
                    <h3>Reported Users</h3>
                    <ReportedUsers />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
