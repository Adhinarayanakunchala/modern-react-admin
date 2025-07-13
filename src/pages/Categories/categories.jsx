import React, { useEffect, useState } from 'react';
import Commanclasses from '../../Styles/Common.module.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Line, LineChart, PieChart, Pie } from 'recharts';
import useStore from 'store';
import { useForm, Controller } from 'react-hook-form';
import { Services } from 'Services';
import { SuccessSwal, warningSwal } from 'Util/Toast';
import { NullCheck } from 'Components/validators';
import ReactLoading from "react-loading";
import UserCategoryCahrts from './UserCategoryCahrts';
import Icon from '../../Assets/folder.png'
import { useNavigate } from 'react-router-dom';
function DashboardCharts() {
    const navigate = useNavigate();
    const { showNavbar } = useStore(state => state);
    const [loading, setLoading] = useState(false);
    const [newUsers, setNewUsers] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Dashboard")[0];
    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            return;
        } else {
            navigate("/forbidden");
        }
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ defaultValues: { Type: "week" } });
    const selectedType = watch("Type");

    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    useEffect(() => {
        onSubmit({ Type: "week" })
    }, [])

    const onSubmit = async (data) => {

        if (data.Type == 'custom' && data.ToDate < data.FromDate) {
            setError("ToDate", { message: "ToDate always  grater than Fromdate" })
            return;
        }
        setLoading(true);
        try {
            const res = await Services.ChartsData("POST", JSON.stringify(data), token);
            setLoading(false);
            if (res.Status === 1) {
                if (selectedType === "month") {
                    setNewUsers(
                        res?.NewUsers.sort((a, b) => a.Date.localeCompare(b.Date))
                    );
                    setAdmin(res?.Admin.sort((a, b) => a.Date.localeCompare(b.Date)));
                    setTotalRevenue(
                        res?.TotalRevenueByDate.sort((a, b) => a.Date.localeCompare(b.Date))
                    );
                } else {
                    setNewUsers(res?.NewUsers);
                    setAdmin(res?.Admin);
                    setTotalRevenue(res?.TotalRevenueByDate);
                }
            } else if (res.Status === 0) {
                warningSwal("warning", res.Message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const validateDates = (value, type) => {
        const currentDate = new Date().toISOString().split('T')[0];

        if (type === "FromDate") {
            if (value && value > currentDate) {
                return "FromDate cannot be a future date";
            }
        } else if (type === "ToDate") {
            if (value && value > currentDate) {
                return "ToDate cannot be a future date";
            }
        }
        return true;
    };

    return (

        <div className={Commanclasses.maincontent}>
            <div className={Commanclasses.Formwrapper}>
                <form onSubmit={handleSubmit(onSubmit)} className={Commanclasses.forminputs}>

                    <div className={Commanclasses["form-control"]}>
                        <label htmlFor="Type">
                            Type{" "}
                            <span className="important">*</span>
                        </label>
                        <select
                            {...register("Type", {
                                required: "this field is required",
                                validate: NullCheck,
                            })}
                        >
                            <option value="">Select Type</option>
                            <option value={"week"}>Week</option>
                            <option value={"month"}>Month</option>
                            <option value={"today"}>Today</option>
                            <option value={"custom"}>Custom Date</option>
                        </select>
                        {errors.Type && (
                            <span>{errors.Type.message}</span>
                        )}
                    </div>

                    {selectedType === "custom" && (
                        <>
                            <div className={Commanclasses["form-control"]}>
                                <label htmlFor="Type">From Date{" "}
                                    <span className="important">*</span>
                                </label>
                                <input
                                    type="date"
                                    {...register("FromDate", {
                                        required: "FromDate is required",
                                        validate: value => validateDates(value, "FromDate"),
                                    })}
                                />
                                {errors.FromDate && <span>{errors.FromDate.message}</span>}
                            </div>

                            <div className={Commanclasses["form-control"]}>
                                <label htmlFor="Type">To Date{" "}
                                    <span className="important">*</span>
                                </label>
                                <input
                                    type="date"
                                    {...register("ToDate", {
                                        required: "ToDate is required",
                                        validate: value => validateDates(value, "ToDate"),
                                    })}
                                />
                                {errors.ToDate && <span>{errors.ToDate.message}</span>}
                            </div>
                        </>
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
            <div className={Commanclasses.userChart} data-aos="fade-up"
                data-aos-duration="3000" style={{ overflowY: "hidden" }}>
                <h1>New Users</h1>
                {
                    newUsers.length > 0 ?

                        <BarChart width={showNavbar ? 1160 : 1350}
                            height={500}
                            data={newUsers}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={selectedType == "month" ? "Label" : "Date"} />
                            <YAxis yAxisId="left" orientation="left" stroke="#5BC0DE" />
                            <Tooltip />
                            <Legend />
                            <defs>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF9966" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FF9966" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Bar yAxisId="left" dataKey="TotalNewUsers" fill="url(#colorPv)" />
                        </BarChart> : <div className={Commanclasses.emptydata}>
                            <img src={Icon} alt='empty Image' />
                        </div>}
            </div>
            <div className={Commanclasses.userChart} data-aos="fade-up"
                data-aos-duration="3000" style={{ overflowY: "hidden" }}>
                <h1> Revenue</h1>
                {
                    totalRevenue.length > 0 ?

                        <AreaChart width={showNavbar ? 1160 : 1350}
                            height={500}
                            data={totalRevenue}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={selectedType == "month" ? "Label" : "Date"} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5BC0DE" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#5BC0DE" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="TotalRevenue" stroke="#56638F" fill="url(#colorUv)" />

                        </AreaChart>
                        : <div className={Commanclasses.emptydata}>
                            <img src={Icon} alt='empty Image' />
                        </div>}
            </div>
            <div className={Commanclasses.userChart} data-aos="fade-up"
                data-aos-duration="3000" style={{ overflowY: "hidden" }}>
                <h1>Premium Users & Admin Profiles & Deleted Accounts</h1>
                {
                    admin.length > 0 ?

                        <AreaChart width={showNavbar ? 1160 : 1350} height={500}
                            data={
                                selectedType === "month"
                                    ? admin.map((v, index) => ({ ...v, Date: `Week${index + 1}` }))
                                    : admin
                            }
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorDeactivated" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Legend />
                            <Tooltip />
                            <Area type="monotone" dataKey="TotalProfilesFromAdmin" stroke="#8884d8" fill="url(#colorAdmin)" />
                            <Area type="monotone" dataKey="PremiumUsersToday" stroke="#82ca9d" fill="url(#colorPremium)" />
                            <Area type="monotone" dataKey="DeactivatedAccounts" stroke="#ffc658" fill="url(#colorDeactivated)" />
                        </AreaChart> : <div className={Commanclasses.emptydata}>
                            <img src={Icon} alt='empty Image' />
                        </div>}
            </div>
            <div className={Commanclasses.UserCahrts}>
                <h1>User Category Wise Charts</h1>
                <UserCategoryCahrts />
            </div>
        </div>
    )
}

export default DashboardCharts;