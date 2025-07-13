import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NullCheck } from "../../../Components/validators";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";

function AddBanner() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const [edit, setEdit] = useState(false);
    const [base64, setbase64] = useState("");
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

    const [priorityOptions, setPriorityOptions] = useState([]);
    const bannerCategory = watch("BannerCategory");
    const redirectStatus = watch("RedirectStatus");
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Banners")[0];

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
            Services.BannerById(
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
                        setCategoryDetails(response.Banners);
                        reset({
                            BannerCategory: response.Banners.BannerCategory,
                            Priority: response.Banners.Priority,
                            RedirectURL: response.Banners.RedirectURL,
                            RedirectStatus: response.Banners.RedirectStatus,
                        });
                        setbase64(response.Banners.BannerImage);
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

    function filehandleChange(file, folderType) {
        // console.log(file.type);

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            alert(`${file.name} is not a PNG, JPEG, or WebP image.`);
            return false;
        }

        let formData = new FormData();
        formData.append("image", file);
        formData.append("folder", folderType);

        Services.UplaodImage("POST", formData, token)
            .then((res) => {
                console.log("res", res);
                if (res?.Status === 1) {
                    setbase64(res?.Image);
                    setValue(
                        "BannerImage",
                        res?.ImageID
                    );
                } else if (res.Status === 0) {
                    warningSwal("warning", res.Message);
                }
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            });
    }

    const onSubmit = (data) => {
        // setLoading(true);
        if (edit) {
            Services.EditBanner(
                "PUT",
                JSON.stringify(data),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Banner Updated", response.Message);
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
            Services.AddBanner("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Banner Added", response.Message);
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

    const fileuploadDesign = (
        <div className={TutorClasses["add-item"]}>
            <BsCloudUpload className={TutorClasses["upload-icon"]} />
            <h5>Drag Your Files here</h5>
            <p>(Only *.jpeg ,*.png will be accepted)</p>
        </div>
    );
    const backButton = () => {
        Navigate(-1);
    };

    React.useEffect(() => {
        switch (bannerCategory) {
            case 'HOME':
                setPriorityOptions([
                    { value: 1, label: "Banner 1" },
                    { value: 2, label: "Banner 2" }
                ]);
                break;
            case 'PROFILE':
                setPriorityOptions([
                    { value: 1, label: "Banner 1" }
                ]);
                break;
            default:
                setPriorityOptions([
                    { value: 1, label: "Banner 1" },
                    { value: 2, label: "Banner 2" },
                    { value: 3, label: "Banner 3" },
                    { value: 4, label: "Banner 4" }
                ]);
                break;
        }
    }, [bannerCategory]);
    return (
        <Layout Active={"Banners"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update " : "Add "} Banner</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Banner" : "Update Banner"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Banner Category{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("BannerCategory", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            >
                                <option value="">Select Type</option>
                                <option value={"HOME"}>HOME</option>
                                <option value={"EXPLORE"}>EXPLORE</option>
                                <option value={"PREMIUM"}>PREMIUM</option>
                                <option value={"NEARYOU"}>NEARYOU</option>
                                <option value={"PREFERENCE"}>PREFERENCE</option>
                                <option value={"PROFILE"}>PROFILE</option>
                            </select>
                            {errors.BannerCategory && (
                                <span>{errors.BannerCategory.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="Priority">
                                Banner Priority{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Priority", {
                                    required: "this field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">Select Priority</option>
                                {priorityOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {errors.Priority && (
                                <span>{errors.Priority.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="RedirectStatus">
                                Redirect Status{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("RedirectStatus", {
                                    required: false,
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">Select Type</option>
                                <option value={1}>Premium Plans</option>
                                <option value={2}>URL</option>
                            </select>
                            {errors.RedirectStatus && (
                                <span>{errors.RedirectStatus.message}</span>
                            )}
                        </div>
                        {
                            redirectStatus === 2 && (

                                <div className={TutorClasses["form-control"]}>
                                    <label htmlFor="RedirectURL">
                                        Redirected URL{" "}
                                        <span className="important">*</span>
                                    </label>
                                    <input type="text"
                                        placeholder="ex:, htt://bandham.com"
                                        {...register("RedirectURL", {
                                            required: false,
                                            // validate: NullCheck
                                        })}
                                    />
                                    {errors.RedirectURL && (
                                        <span>{errors.RedirectURL.message}</span>
                                    )}
                                </div>
                            )}
                        <div className={TutorClasses["file-upload-wrapper"]}>
                            <header>
                                <h3>
                                    Upload Banner{" "}
                                    <span className="important">*</span>
                                </h3>
                            </header>
                            <FileUploader
                                classes={TutorClasses["upload-image"]}
                                multiple={false}
                                handleChange={(file) => filehandleChange(file, "Banners")}
                                name="file"
                                children={fileuploadDesign}
                            />
                        </div>

                        {base64 && (
                            <div
                                className={TutorClasses["file-images-wrapper"]}>
                                <div className={TutorClasses["image"]}>
                                    <img
                                        src={base64}
                                        alt="uploaded-data"
                                        onClick={() => {
                                            window.open(base64, "_blank");
                                        }}
                                    />
                                </div>
                            </div>
                        )}

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

export default AddBanner;
