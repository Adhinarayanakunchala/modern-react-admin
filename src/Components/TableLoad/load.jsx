import React from "react";
import Skeleton from "react-loading-skeleton";
import loadClasses from "./load.module.css";
function Load({ TableHead }) {
    return (
        <div className={loadClasses["Table"]}>
            <table>
                <thead>
                    <tr>
                        {TableHead.map((item) => (
                            <th>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array(3)
                        .fill()
                        .map(() => (
                            <tr>
                                {Array(TableHead.length)
                                    .fill("0")
                                    .map((item) => (
                                        <td>
                                            <Skeleton />
                                        </td>
                                    ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Load;
