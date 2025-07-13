import React, { useState, useEffect } from "react";
import navbarClasses from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { menuItems } from "./config";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../Assets/Group.png";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Sidenav({ Active, show, setShow }) {
    const dropDown = useStore((item) => item.dropdown);
    const setDropdown = useStore((item) => item.setDropdown);
    const shouldAnimate = useStore((item) => item.shouldAnimate);
    const setShouldAnimate = useStore((item) => item.setShouldAnimate);

    const hasPermission = (permissions) => {
        let storageData = JSON.parse(localStorage.getItem("AccessItems"));

        let requiredItem = storageData.filter(
            (item) => item?.PageName === permissions
        );
        if (
            requiredItem &&
            requiredItem.length > 0 &&
            requiredItem[0].CanRead === 1
        ) {
            return true;
        }
        return false;
    };

    const clickhandler = () => {
        setDropdown("");
        setShow((prev) => !prev);
    };

    const [screenSize, getDimension] = useState({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight,
    });

    const closeHnadler = () => {
        if (window.innerWidth <= 900 && show) {
            setShow(false);
            setDropdown("");
        }
    };

    const setDimension = () => {
        getDimension({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight,
        });
        closeHnadler();
    };

    useEffect(() => {
        window.addEventListener("resize", setDimension);

        return () => {
            window.removeEventListener("resize", setDimension);
        };
        // eslint-disable-next-line
    }, [screenSize]);

    return (
        <div>
            <div
                className={`${show ? navbarClasses["backdrop"] : ""}`}
                onClick={() => {
                    setShow(false);
                    setDropdown("");
                }}></div>

            <div
                className={`${navbarClasses["Container"]} ${!show ? navbarClasses["hide"] : ""
                    }`}>
                <div className={navbarClasses["hamburger"]}>
                    <img
                        className={!show && navbarClasses["img-size"]}
                        src={Logo}
                        alt="logo"
                        onClick={() => {
                            window.open("/", "_blank", "noopener,noreferrer");
                        }}
                    />
                    <button
                        className={navbarClasses["hamburger-icon"]}
                        onClick={clickhandler}>
                        <GiHamburgerMenu size={22} color="white" />
                    </button>
                </div>

                <div className={navbarClasses["navlinks"]}>
                    {menuItems?.map((menuData) => {
                        if (!menuData.multiple) {
                            if (hasPermission(menuData?.name)) {
                                return (
                                    <>
                                        <NavLink
                                            key={menuData.id}
                                            id={menuData.id}
                                            to={menuData.menuLink}
                                            data-tooltip-id={menuData.id}
                                            data-tooltip-content={menuData.name}
                                            data-tooltip-position-strategy={
                                                "fixed"
                                            }
                                            className={
                                                Active === menuData.active
                                                    ? navbarClasses["navActive"]
                                                    : navbarClasses[
                                                    "navInactive"
                                                    ]
                                            }>
                                            <menuData.icon
                                                className={
                                                    navbarClasses["nav-icon"]
                                                }
                                            />
                                            {show && (
                                                <span>{menuData.name}</span>
                                            )}
                                        </NavLink>{" "}
                                        <ReactTooltip
                                            id={menuData.id}
                                            place="left"
                                            variant="info"
                                            hidden={show}
                                        />
                                    </>
                                );
                            }
                            return null;
                        } else {
                            // let allData = [];
                            // menuData.items.forEach((item) => {
                            //     if (hasPermission(item.name)) {
                            //         allData.push(item);
                            //     }
                            // });
                            if (hasPermission(menuData.name)) {
                                return (
                                    <div className={navbarClasses["seo"]}>
                                        <div
                                            data-tooltip-id={menuData.id}
                                            data-tooltip-content={menuData.name}
                                            data-tooltip-position-strategy={
                                                "fixed"
                                            }
                                            className={
                                                navbarClasses["seo-item"]
                                            }
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (
                                                    dropDown === menuData.name
                                                ) {
                                                    setDropdown("");
                                                } else {
                                                    if (!show) {
                                                        setShow(true);
                                                    }
                                                    setDropdown(menuData.name);
                                                }
                                            }}>
                                            <menuData.icon
                                                data-tooltip-id={menuData.id}
                                                data-tooltip-content={
                                                    menuData.name
                                                }
                                                data-tooltip-position-strategy={
                                                    "fixed"
                                                }
                                                className={
                                                    navbarClasses["nav-icon"]
                                                }
                                            />
                                            <ReactTooltip
                                                id={menuData.id}
                                                place="left"
                                                variant="info"
                                                hidden={show}
                                            />
                                            {show && (
                                                <p>
                                                    {menuData.name}{" "}
                                                    {dropDown ===
                                                        menuData.name ? (
                                                        <RiArrowDropUpFill
                                                            size={30}
                                                        />
                                                    ) : (
                                                        <RiArrowDropDownFill
                                                            size={30}
                                                        />
                                                    )}{" "}
                                                </p>
                                            )}
                                        </div>
                                        <AnimatePresence
                                            initial={
                                                !(dropDown === menuData.name)
                                            }>
                                            {dropDown === menuData.name && (
                                                <motion.div
                                                    key={dropDown}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: "auto" }}
                                                    exit={{ height: 0 }}
                                                    transition={{
                                                        duration: 0.4,
                                                    }}
                                                    onAnimationComplete={() => {
                                                        setShouldAnimate(false);
                                                    }}
                                                    className={`${navbarClasses[
                                                        "seo-item-nav"
                                                    ]
                                                        } ${shouldAnimate
                                                            ? "animate-class"
                                                            : ""
                                                        }`}>
                                                    {menuData?.items?.map(
                                                        (links, id) => {
                                                            if (links.name) {
                                                                return (
                                                                    <NavLink
                                                                        key={id}
                                                                        id={1}
                                                                        to={
                                                                            links.menuLink
                                                                        }
                                                                        className={`${Active ===
                                                                            links.active
                                                                            ? navbarClasses[
                                                                            "navActive"
                                                                            ]
                                                                            : navbarClasses[
                                                                            "navInactive"
                                                                            ]
                                                                            } ${!show
                                                                                ? navbarClasses[
                                                                                "sub-link-hide"
                                                                                ]
                                                                                : ""
                                                                            }`}>
                                                                        {show && (
                                                                            <span
                                                                                title={
                                                                                    links.name
                                                                                }>
                                                                                {
                                                                                    links.name
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </NavLink>
                                                                );
                                                            }
                                                            return null;
                                                        }
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }
                            return null;
                        }
                    })}
                </div>
                {/* <button
                    className={navbarClasses["logout"]}
                    onClick={logoutHandler}>
                    <HiOutlineLogout size={23} title="Layout" />
                    {show && <p>Logout</p>}
                </button> */}
            </div>
        </div>
    );
}

export default Sidenav;
