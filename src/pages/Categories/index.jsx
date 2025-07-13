import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import DashboardCharts from "./categories";
import { useEffect } from "react";

function Tutor() {
    const Navigate = useNavigate();
    return (
        <Layout Active={"Dashboard"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DashBoard</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>
                <div className={CommonClasses["wrapper"]}>
                    <h3>DashBoard </h3>
                    <DashboardCharts />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
