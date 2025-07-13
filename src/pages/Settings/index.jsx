import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import Settings from "./Settings";

function Tutor() {
    const Navigate = useNavigate();
    // const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    // const filteredItems = AccessItems.filter((item) => item.PageName === "Banners")[0];

    // const handleAdd = () => {
    //     if (filteredItems?.CanRead === 1) {
    //         Navigate("/banners/add");
    //     } else {
    //         Navigate("/forbidden");
    //     }
    // };
    return (
        <Layout Active={"Settings"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Settings</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>
                <div className={CommonClasses["wrapper"]}>
                    <h3>Settings</h3>
                    <Settings />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
