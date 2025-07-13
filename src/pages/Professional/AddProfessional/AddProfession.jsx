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
function AddProfession() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const [edit, setEdit] = useState(false);
    const [base64, setbase64] = useState("");
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [mainLoad, setMainLoad] = useState(false);
    const [categorys, setCategorys] = useState([]);
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
    const filteredItems = AccessItems.filter((item) => item.PageName === "Career & Education")[0];
    useEffect(() => {
        if (filteredItems?.CanWrite === 1 || filteredItems?.CanEdit === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);

    const getCategory = async () => {
        try {
            const res = await Services.PCategorys("GET", null, token)
            if (res.Status === 1) {
                setCategorys(res.ProfessionCategory);
            } else if (res.Status === 0) {
                warningSwal("Warning", res.Message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCategory();
    }, [])

    useEffect(() => {
        if (params.get("id")) {
            setEdit(true);
            Services.ProfessionById(
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
                        setCategoryDetails(response.Profession);
                        reset({
                            ProfessionName: response.Profession.ProfessionName,
                            Profession_CategoryID: response.Profession.Profession_CategoryID,
                        });
                        setTimeout(() => {
                            setMainLoad(false);
                        }, 200);
                    } else if (response.Status === 0) {
                        warningSwal("Warning", response.Message);
                    }
                })

                .catch((err) => {

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
            Services.EditProfession(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Profession Updated", response.Message);
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
            Services.AddProfession("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Profession Added", response.Message);
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
        <Layout Active={"Profession"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} Profession</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Profession" : "Update Profession"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Profession Name{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("ProfessionName", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.ProfessionName && (
                                <span>{errors.ProfessionName.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Profession ctegory <span className="important">*</span>
                            </label>
                            <select
                                {...register("Profession_CategoryID", {
                                    required: true,
                                })}>
                                <option value="">select</option>
                                {
                                    categorys.map((item) => (
                                        <option key={item.Profession_CategoryID} value={item.Profession_CategoryID}>
                                            {item.Profession_CategoryName}
                                        </option>
                                    ))}
                            </select>
                            {errors.Profession_CategoryID && (
                                <span>This field is required</span>
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

export default AddProfession;
