import React from "react";
import LayoutClasses from "./Layout.module.css";
import SideNav from "../SideNav/Navbar";
import useStore from "../../store";

import TopNav from "../topNav";
import { useEffect } from "react";
function Layout({ children, Active }) {
    const showNav = useStore((state) => state.showNavbar);
    const setShowNav = useStore((state) => state.setshowNavbar);
    const setActiveTab = useStore((State) => State.setActiveTab);
    useEffect(() => {
        console.log('Active', Active)
        setActiveTab(Active);
        // eslint-disable-next-line
    }, []);
    return (
        <div className={LayoutClasses["Wrapper"]}>
            <SideNav Active={Active} setShow={setShowNav} show={showNav} />

            <div
                className={`${LayoutClasses["main-content"]} ${!showNav ? LayoutClasses["nav-hide"] : ""
                    }`}>
                <TopNav />
                <div style={{ zIndex: "2" }}>{children}</div>
            </div>
        </div>
    );
}

export default Layout;
