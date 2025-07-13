import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NullCheck } from "../../../Components/validators";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
window.Buffer = window.Buffer || require("buffer").Buffer;
function AddState() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    let location = useLocation();
    let statedata = location.state || {};
    const [edit, setEdit] = useState(false);
    const [mainLoad, setMainLoad] = useState(false);
    const Navigate = useNavigate();
    // console.log(statedata);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Personal Information")[0];

    useEffect(() => {
        if (filteredItems?.CanWrite === 1 || filteredItems?.CanEdit === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, [filteredItems]);
    useEffect(() => {
        if (params.get("id") && statedata) {
            setValue("State", statedata?.State);
            setValue("Priority", statedata?.Priority);
            setValue("Status", statedata?.Status);
            setEdit(true);
        }
    }, [statedata]);

    const onSubmit = (data) => {
        if (edit) {
            let body = data;
            Services.EditState(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("State Updated", response.Message);
                        Navigate(-1);
                    } else if (response.Status === 0) {
                        setLoading(false);
                        warningSwal("Warning", response.Message);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    alert("something went wrong please try again");
                    console.log(err);
                });

        } else {
            Services.AddState("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("State Added", response.Message);
                    } else if (response.Status === 0) {
                        setLoading(false);
                        warningSwal("Warning", response.Message);
                    }
                })
                .catch((err) => {
                    // alert(err);
                    setLoading(false);
                    alert("something went wrong please try again");
                    console.log(err);
                });
        }
    };
    const backButton = () => {
        Navigate(-1);
    };

    return (
        <Layout Active={"Plans"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} State</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Plan" : "Update Plan"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                State{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("State", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.State && (
                                <span>{errors.State.message}</span>
                            )}
                        </div>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="Priority">
                                Priority{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("Priority", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.Priority && (
                                <span>{errors.Priority.message}</span>
                            )}
                        </div>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="Status">
                                Status{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Status", {
                                    required: "this field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value={""}>Select Status</option>
                                <option value={1}>Active</option>
                                <option value={2}>InActive</option>
                            </select>
                            {errors.Status && (
                                <span>{errors.Status.message}</span>
                            )}
                        </div>

                        <button disabled={loading}>
                            {" "}
                            {loading ? (
                                <ReactLoading
                                    color="green"
                                    type="spokes"
                                    height={30}
                                    width={30}
                                />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default AddState;
