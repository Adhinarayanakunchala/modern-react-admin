import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import Pcategorys from "./Pcategorys";
function Tutor() {
    const Navigate = useNavigate();
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Career & Education")[0];
    const handleAdd = () => {
        if (filteredItems?.CanWrite === 1) {
            Navigate("/pCategory/add")
        } else {
            Navigate("/forbidden");
        }
    };
    return (
        <Layout Active={"Profession Category"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Profession Categorys</title>
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
                    <h3>Profession Categories</h3>
                    <Pcategorys />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
