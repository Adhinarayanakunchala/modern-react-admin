import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import Citys from "./Citys";
import { warningSwal } from "Util/Toast";

function Tutor() {
    const Navigate = useNavigate();
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Personal Information")[0];

    const handleAdd = () => {
        if (filteredItems?.CanWrite === 1) {
            Navigate("/city/add");
        } else {
            Navigate("/forbidden");
        }
    };
    return (
        <Layout Active={"Cities"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cities</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>
                <div className={CommonClasses["control-btns"]}>
                    <button
                        className={CommonClasses["button"]}
                        onClick={handleAdd}>
                        <BiPlus size={20} /> Create New
                    </button>
                </div>
                <div className={CommonClasses["wrapper"]}>
                    <h3>Cities</h3>
                    <Citys />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
