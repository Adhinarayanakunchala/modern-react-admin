import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
window.Buffer = window.Buffer || require("buffer").Buffer;
function AddHeight() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    let location = useLocation();
    const Height = location.state || {};
    const [edit, setEdit] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [mainLoad, setMainLoad] = useState(false);
    const Navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const feet = watch("Height_ft");
    const inches = watch("Height_In");

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

        if (edit && Height) {
            reset({
                Height: Height.Height,
                Height_ft: Height.Height_ft,
                Height_In: Height.Height_In
            })
            setEdit(true);
        }
    }, [edit, Height, reset]);

    const onSubmit = (data) => {
        // setLoading(true);
        if (edit) {
            let body = data;
            Services.EditHeight(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Height Updated", response.Message);
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
            Services.AddHeight("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Height Added", response.Message);
                    } else if (response.Status === 0) {
                        setLoading(false);
                        warningSwal("Warning", response.Message);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    };


    const backButton = () => {
        Navigate(-1);
    };
    const Feets = [
        { value: 4, id: 1 },
        { value: 5, id: 2 },
        { value: 6, id: 3 },
        { value: 7, id: 4 },
        { value: 8, id: 5 },
    ]
    const Inches = [
        { value: 1, id: 1 },
        { value: 2, id: 2 },
        { value: 3, id: 3 },
        { value: 4, id: 4 },
        { value: 5, id: 5 },
        { value: 6, id: 6 },
        { value: 7, id: 7 },
        { value: 8, id: 8 },
        { value: 9, id: 9 },
        { value: 10, id: 10 },
        { value: 11, id: 11 },
    ]
    useEffect(() => {
        if (feet && inches) {
            const totalInches = parseInt(feet) * 12 + parseInt(inches);
            const cm = totalInches * 2.54;
            setValue("Height_Cm", cm.toFixed(2));
        }
    }, [feet, inches, setValue]);

    return (
        <Layout Active={"Height"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} Height</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Height" : "Update Height"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Height_ft{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Height_ft", {
                                    required: "This field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value="" disabled selected> Height Ft</option>
                                {
                                    Feets.map((item) => (
                                        <option key={item.id} value={item.value}>
                                            {item.value}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.Height_ft && (
                                <span>{errors.Height_ft.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Height_In{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Height_In", {
                                    required: "This field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value="" disabled selected>Height In</option>
                                {
                                    Inches.map((item) => (
                                        <option key={item.id} value={item.value}>
                                            {item.value}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.Height_In && (
                                <span>{errors.Height_In.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Height_Cm{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("Height_Cm", {
                                    required: "This field is required",
                                    valueAsNumber: false
                                })}
                                readOnly
                            />
                            {errors.Height_Cm && (
                                <span>{errors.Height_Cm.message}</span>
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

export default AddHeight;
