import React from "react";
import { FallingLines } from "react-loader-spinner";
import LoadClasses from "./loader.module.css";
function Loader() {
    return (
        <div className={LoadClasses["Loader-wrapper"]}>
            <div className={LoadClasses["loader"]}>
                <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel="falling-lines-loading"
                />
            </div>
        </div>
    );
}

export default Loader;
