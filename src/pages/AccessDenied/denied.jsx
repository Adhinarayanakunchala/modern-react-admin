import React from "react";
import Layout from "../../Components/Layout";
import DeniedClasses from "./denied.module.css";
import AccessDenied from "../../Assets/Access_denied.png";
function Denied() {
    return (
        <Layout>
            <div className={DeniedClasses["Container"]}>
                <h3>
                    {" "}
                    we,re sorry, But you dont have required permissions to
                    access this page.Please contact the site administrator.
                </h3>
                <img src={AccessDenied} alt="denied-img" />
            </div>
        </Layout>
    );
}

export default Denied;
