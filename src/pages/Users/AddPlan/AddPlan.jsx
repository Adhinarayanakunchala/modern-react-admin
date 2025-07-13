import React, { useEffect, useState } from 'react'
import style from './plan.module.css'
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io';
import { Services } from 'Services';
import { SuccessSwal, warningSwal } from 'Util/Toast';
import moment from 'moment';
const AddPlan = (props) => {
    const [plans, setPlans] = useState([]);
    const [plan, setPlan] = useState({});
    const { register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();
    const today = new Date().toISOString().split("T")[0];

    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    const openhandler = (e) => {
        e.stopPropagation();
    };
    // console.log(props.premium);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let [Allplans] = await Promise.all([Services.getPremiumPlans("GET", null, token)]);
                if (Allplans?.Status === 1) {
                    setPlans(Allplans?.Plans);
                    if (props?.premium == 1) {
                        await getPlan();
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchdata();
    }, []);


    const handleplan = (planId) => {
        if (props.premium == 0) {
            console.log('enterd', "jnjbbh")
            if (planId) {
                const plan = plans.find(item => item?.PremiumPlanID == planId);
                console.log(plan);
                setValue("CustomValidity", plan?.Validity);
                setValue("CustomCredits", plan?.Credits);

            } else {
                console.log("Filling Plan Data  was faild")
            }
        }
    }

    const getPlan = async () => {
        let body = {
            UserID: props.userId
        }
        try {
            const res = await Services.getPlan("POST", JSON.stringify(body), token);
            if (res.Status === 1) {
                setPlan(res?.Plan);
                reset({
                    PremiumPlanID: res?.Plan?.PremiumPlanID,
                    StartDate: moment(res?.Plna?.SubscriptionStartDate).format("YYYY-MM-DD"),
                    CustomValidity: res?.Plan?.Validity,
                    CustomCredits: res?.Plan.Credits
                })
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (data) => {
        let body = {
            ...data,
            UserID: props.userId
        }

        if (props.premium == 0) {
            try {
                const res = await Services.AddPremium("POST", JSON.stringify(body), token);
                if (res.Status === 1) {
                    SuccessSwal("Success", res.Message);
                    reset();
                    props.onClose();
                    props.getUsers(props.type, props.page, props.size);
                } else if (res.Status === 0) {
                    warningSwal("warning", res.Message);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await Services.UpgradePremium("POST", JSON.stringify(body), token);
                if (res.Status === 1) {
                    SuccessSwal("Success", res.Message);
                    reset();
                    props.onClose();
                    props.getUsers(props.type, props.page, props.size);
                } else if (res.Status === 0) {
                    warningSwal("warning", res.Message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const DeletePlan = () => {
        let body = {
            UserID: plan?.UserID,
            SubscriptionID: plan?.SubscriptionID
        }
        Services.DeletePremium("POST", JSON.stringify(body), token).then((res) => {
            if (res.Status === 1) {
                SuccessSwal("Success", res.Message);
                props.onClose();
                props.getUsers(props.type, props.page, props.size);
            } else if (res.Status === 0) {
                warningSwal("Warning", res.Message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className={style.modal} onClick={props.onClose}>
            <div className={style["modal-content"]} onClick={openhandler}>
                <div className={style["modal-content-header"]}>
                    <div>
                        <h3>{props.premium == 1 ? "Update Plan" : "Add Plan"}</h3>
                    </div>
                    <button
                        className={style["close-btn"]}
                        onClick={props.onClose}
                    >
                        <IoMdClose size={22} color={"red"} />
                    </button>
                </div>
                <div className={style["form_wrapper"]}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={style["form-control"]}>
                            <label htmlFor="PremiumPlanID">Plan</label>
                            <select
                                {...register("PremiumPlanID",
                                    {
                                        required: "Plan is required",
                                        valueAsNumber: true,
                                        onChange: (e) => { handleplan(e.target.value); console.log(e.target.value) }
                                    })}
                            >
                                <option value="" selected disabled>select Plan</option>
                                {
                                    plans?.map((item) => (
                                        <option key={item.PremiumPlanID} value={item.PremiumPlanID}>{item.PlanName}</option>
                                    ))
                                }

                            </select>
                            {errors.PremiumPlanID && <span>{errors.PremiumPlanID.message}</span>}
                        </div>
                        <div className={style["form-control"]}>
                            <label htmlFor="StartDate">Start Date</label>
                            <input
                                type="date"
                                {...register("StartDate", {
                                    required: "StartDate is required"
                                })}
                                min={today}
                            />
                            {errors.StartDate && <span>{errors.StartDate.message}</span>}
                        </div>
                        <div className={style["form-control"]}>
                            <label htmlFor="CustomValidity">Custom Validity</label>
                            <input
                                type="number"
                                {...register("CustomValidity", {
                                    required: "Custom Validity is required"
                                })}
                            />
                            {errors.CustomValidity && <span>{errors.CustomValidity.message}</span>}
                        </div>
                        <div className={style["form-control"]}>
                            <label htmlFor="CustomCredits">CustomCredits</label>
                            <input
                                type="number"
                                {...register("CustomCredits", {
                                    required: "Custom credits is required"
                                })}
                            />
                            {errors.CustomCredits && <span>{errors.CustomCredits.message}</span>}
                        </div>
                        <div className={style["btn-wrapper"]}>
                            <button type='submit'>{props.premium == 0 ? "Add Plan" : "Update Plan"}</button>
                            {props.premium == 1 ?
                                <button type='button' className={style["remove"]} onClick={() => DeletePlan()}>Remove Plan</button> : ""}
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddPlan