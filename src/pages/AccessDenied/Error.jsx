import React from "react";
import Layout from "../../Components/Layout";
import DeniedClasses from "./denied.module.css";
import AccessDenied from "../../Assets/Access_denied.png";
function Denied() {
    return (
        <Layout>
            <div className={DeniedClasses["Container"]}>
                <h3> Something went Wrong Please Try again</h3>
                <img src={AccessDenied} alt="denied-img" />
            </div>
        </Layout>
    );
}

export default Denied;
