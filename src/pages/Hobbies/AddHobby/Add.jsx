import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import S3FileUpload from "react-s3";
import { config } from "../../../s3config";
import { FileUploader } from "react-drag-drop-files";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NullCheck } from "../../../Components/validators";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
window.Buffer = window.Buffer || require("buffer").Buffer;
function AddHobbies() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const [edit, setEdit] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState([]);
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
        if (params.get("id")) {
            setEdit(true);
            Services.HobbiesById(
                "GET",
                null,
                token,
                params.get("id")
            )
                .then((response) => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                    if (response.Status === 1) {
                        setCategoryDetails(response.HobbiesById);
                        reset({
                            Hobbie_CategoryID: response.HobbiesById.Hobbie_CategoryID,
                            Hobbie: response.HobbiesById.Hobbie,
                        });
                        setTimeout(() => {
                            setMainLoad(false);
                        }, 200);
                    } else if (response.Status === 0) {
                        warningSwal("Warning", response.Message);
                    }
                })

                .catch((err) => {
                    // alert(err);
                    alert("something went wrong please try again");
                    console.log(err);
                });
        }

    }, []);
    useLayoutEffect(() => {
        if (params.get("id")) {
            setMainLoad(true);
        }

    }, []);

    const onSubmit = (data) => {
        // setLoading(true);
        if (edit) {
            let body = data;


            Services.EditHobbie(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Hobbie Updated", response.Message);
                        Navigate(-1);
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

        } else {
            Services.AddHobbie("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Hobbie Added", response.Message);
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
        <Layout Active={"Hobbies"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} Hobbie</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Hobbie" : "Update Hobbie"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Hobbie{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                placeholder="Hobbie name"
                                {...register("Hobbie", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.Hobbie && (
                                <span>{errors.Hobbie.message}</span>
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
            </div >
        </Layout >
    );
}

export default AddHobbies;
