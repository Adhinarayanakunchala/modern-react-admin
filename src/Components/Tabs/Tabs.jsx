import React from "react";
import TabClasses from "./Tabs.module.css";
function Tabs({ TabsData, setActiveTab, ActiveTab }) {
    const NavHandler = (e) => {
        let tabType = e.currentTarget.getAttribute("btn-type");
        setActiveTab(tabType);
    };
    return (
        <div className={TabClasses["Navigator"]}>
            {TabsData?.map((item) => (
                <button
                    btn-type={item}
                    className={ActiveTab === item ? TabClasses["active"] : ""}
                    onClick={NavHandler}>
                    {item}
                </button>
            ))}

        </div>
    );
}

export default Tabs;
