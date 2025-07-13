import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NullCheck } from "../../../Components/validators";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
function AddLanguage() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const [edit, setEdit] = useState(false);
    const location = useLocation();
    const Language = location.state || {};
    const [mainLoad, setMainLoad] = useState(false);
    const Navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
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
    }, []);
    useEffect(() => {

        if (params.get("id") && Language) {
            reset({
                Language: Language?.Language,
                Priority: Language?.Priority,
            })
            setEdit(true);
        }

    }, [reset, Language]);

    const onSubmit = (data) => {
        // setLoading(true);
        if (edit) {
            let body = data;
            Services.EditLanguage(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Language Updated", response.Message);
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
            Services.AddLanguage("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Language  Added", response.Message);
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
        }
    };


    const backButton = () => {
        Navigate(-1);
    };
    return (
        <Layout Active={"Languages"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} Language</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Language" : "Update Language"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Language{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("Language", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.Language && (
                                <span>{errors.Language.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
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

export default AddLanguage;
