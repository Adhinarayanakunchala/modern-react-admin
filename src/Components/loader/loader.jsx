import React from "react";
import ReactLoading from "react-loading";
import LoadClasses from "./loader.module.css";
function Loader() {
    return (
        <div className={LoadClasses["Loader-wrapper"]}>
            <div className={LoadClasses["loader"]}>
                <ReactLoading
                    color="green"
                    type="spokes"
                    height={30}
                    width={30}
                />
            </div>
        </div>
    );
}

export default Loader;
