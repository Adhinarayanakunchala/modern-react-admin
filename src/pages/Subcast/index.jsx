import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";

import Subcast from "./Subcast";
function Tutor() {
    const Navigate = useNavigate();
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Caste & Communities")[0];

    const handleAdd = () => {
        if (filteredItems?.CanRead === 1) {
            Navigate("/subcaste/add");
        } else {
            Navigate("/forbidden");
        }
    };
    return (
        <Layout Active={"Subcaste"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Subcaste</title>
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
                    <h3>Subcaste</h3>
                    <Subcast />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
