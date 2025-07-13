import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";

import Coupons from "./Coupons";
import { warningSwal } from "Util/Toast";
function Tutor() {
    const Navigate = useNavigate();
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Coupons")[0];

    const handleAdd = () => {
        if (filteredItems?.CanRead === 1) {
            Navigate("/coupons/add");
        } else {
            Navigate("/forbidden");
        }
    };
    return (
        <Layout Active={"Coupons"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Coupons</title>
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
                    <h3>Coupons</h3>
                    <Coupons />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
