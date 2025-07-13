import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";
import Religions from "./Religion";
function Tutor() {
    const Navigate = useNavigate();
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Caste & Communities")[0];

    const handleAdd = () => {
        if (filteredItems?.CanRead === 1) {
            Navigate("/religions/add");
        } else {
            Navigate("/forbidden");
        }
    };
    return (
        <Layout Active={"Religion"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Religions</title>
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
                    <h3>Religions</h3>
                    <Religions />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
