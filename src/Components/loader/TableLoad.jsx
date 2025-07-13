import React from "react";
import Skeleton from "react-loading-skeleton";
import loadClasses from "./loader.module.css";
function Load({ TableHeader }) {
    return (
        <div className={loadClasses["Table"]}>
            <table>
                <thead>
                    <tr>
                        {TableHeader.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array(3)
                        .fill()
                        .map(() => (
                            <tr>
                                <td>
                                    <Skeleton height={"1rem"} />
                                </td>
                                <td>
                                    <Skeleton />
                                </td>
                                <td>
                                    <Skeleton />
                                </td>
                                <td>
                                    <Skeleton />
                                </td>
                                <td>
                                    <Skeleton />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Load;
