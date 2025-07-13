import React, { useEffect } from "react";
import LoginClasses from "./login.module.css";
import LoginLogo from "../../Assets/Bandum.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Services } from "../../Services";
import useStore from "store";

function Login() {
    const Navigate = useNavigate();
    const { userData, setUserData } = useStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            let expiry = localStorage.getItem("expiry");
            if (new Date().getTime() > expiry) {
                localStorage.clear();
            } else {
                Navigate("/dashboard");
            }
        }
        // eslint-disable-next-line
    }, []);

    const onSubmit = (data) => {
        const body = JSON.stringify(data);
        Services.Login("POST", body)
            .then((response) => {
                if (response.Status === 1) {
                    localStorage.setItem(
                        "admindata",
                        JSON.stringify(response?.adminDetails)
                    );
                    setUserData(response?.adminDetails);
                    localStorage.setItem("token", response?.token);
                    localStorage.setItem("RoleId", response?.AdminRoleID);
                    localStorage.setItem(
                        "AccessItems",
                        JSON.stringify(response?.Permissions)
                    );
                    localStorage.setItem(
                        "expiry",
                        new Date().getTime() + 24 * 60 * 60 * 1000
                    );
                    Navigate("/dashboard");
                } else if (response.Status === 0) {
                    toast.error(`${response.Message}`, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((err) => {
                // alert(err);
                alert("something went wrong please try again");
                console.log(err);
            });
    };

    return (
        <div className={LoginClasses["login-wrapper"]}>
            <div className={LoginClasses["login-subwrapper"]}>
                <img src={LoginLogo} alt="login-logo" />

                <div className={LoginClasses["login-form"]}>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={LoginClasses["form-control"]}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                {...register("EmailID", {
                                    required: "Email is required!",
                                })}
                            />
                            {errors?.EmailID && (
                                <p className={LoginClasses.error}>
                                    {errors?.EmailID?.message}
                                </p>
                            )}
                        </div>
                        <div className={LoginClasses["form-control"]}>
                            <label htmlFor="password">Password</label>

                            <input
                                type="password"
                                {...register("Password", {
                                    required: "Password is required!",
                                })}
                            />
                            {errors?.Password && (
                                <p className={LoginClasses.error}>
                                    {errors?.Password?.message}
                                </p>
                            )}
                        </div>
                        <input type="submit" value="Log in" />
                        <span className={LoginClasses.border}></span>
                    </form>

                    {/* <div className={LoginClasses["login-links"]}>
                        <NavLink to="/forgotpassword">
                            forgot your Password?
                        </NavLink>
                        <NavLink to="/createaccount">
                            Create Your Account
                        </NavLink>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Login;
