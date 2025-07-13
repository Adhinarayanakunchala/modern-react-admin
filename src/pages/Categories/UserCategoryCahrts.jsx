import React, { useEffect, useState } from 'react'
import { Services } from 'Services';
import { warningSwal } from 'Util/Toast';
import Commanclasses from '../../Styles/Common.module.css';
import { Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';
import Icon from '../../Assets/folder.png';
import { Bar as ChartjsBar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip as ChartTooltip,
    Legend as ChartLegend
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    ChartTooltip,
    ChartLegend
);

const UserCategoryCahrts = () => {
    const [loading, setLoading] = useState(false);
    const [meritalRecords, setMeritalRecords] = useState([]);
    const [ages, setAges] = useState([]);
    const [jobstatus, setJobstatus] = useState([]);
    const [genders, setGenders] = useState([]);
    const [citys, setCitys] = useState([]);
    const [allusers, setAllusers] = useState([]);
    const [requestData, setRequestData] = useState({});

    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    useEffect(() => {
        onSubmit();
    }, []);

    const onSubmit = async () => {
        setLoading(true);

        try {
            const res = await Services.ChartsData2("POST", null, token);
            setLoading(false);
            if (res.Status === 1) {
                setAges(res?.Age);
                setJobstatus(res?.JobStatus);
                setGenders(res?.Gender);
                setCitys(res?.District);
                setAllusers(res?.UserStatus);
                setMeritalRecords(res?.MaritalStatus);
                setRequestData(res?.Requests);
            } else if (res.Status === 0) {
                warningSwal("warning", res.Message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", 'red'];
    const COLORS2 = ["#00C49F", "#FFBB28"];
    const COLORS3 = ["#E77200", "#2E5894"];
    const COLORS5 = ["#8FBC8B", "#FFBB28"];

    function generateRandomColorCodes(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const colorCode = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            colors.push(colorCode);
        }
        return colors;
    }
    const COLORS4 = generateRandomColorCodes(citys.length);

    const config = {
        citys,
        xField: 'count',
        yField: 'District',
        seriesField: 'District',
        color: ({ District }) => COLORS4[citys.findIndex(city => city.District === District)] || '#00C49F',
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        yAxis: {
            label: {
                autoRotate: false,
            },
        },
        slider: {
            start: 0,
            end: 1,
        },
    };

    const requestedMalesData = {
        labels: ["Requests By Males", "Requests Accepted By Males"],
        datasets: [
            {
                label: "Male Requests",
                data: [requestData?.RequestsByMales || 0, requestData?.RequestsAcceptedByMales || 0],
                backgroundColor: ["#FFA500", "#FFA500"],
                borderColor: ["#FFA500", "#FFA500"],
                borderWidth: 1,
            },
        ],
    };

    const requestedFemalesData = {
        labels: ["Requests By Females", "Requests Accepted By Females"],
        datasets: [
            {
                label: "Female Requests",
                data: [requestData?.RequestsByFemales || 0, requestData?.RequestsAcceptedByFemales || 0],
                backgroundColor: ["#4682B4", "#4682B4"],
                borderColor: ["#4682B4", "#4682B4"],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: "top" },
            title: { display: true, text: "Overview", font: { size: 16 } },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value}`,
                },
            },
        },
    };

    return (
        <div className={Commanclasses.maincontent}>
            <div className={Commanclasses["card-container"]}>
                <h1 id={Commanclasses["headh2"]}>All Users</h1>
                <div className={Commanclasses["cards-menu"]}>
                    {
                        allusers.map((card, index) => (
                            <div className={Commanclasses["card"]} key={index}>
                                <div className={Commanclasses["card-logo"]}>
                                    <p>{card.Count}</p>
                                </div>
                                <div className={Commanclasses["card-body"]}>
                                    <h5>{card.Status}</h5>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={Commanclasses["charts-container"]} style={{ margin: '10px' }}>
                    <div className={Commanclasses["chart"]}>
                        <h5>Requested Males</h5>
                        <ChartjsBar data={requestedMalesData} options={chartOptions} />
                    </div>
                    <div className={Commanclasses["chart"]}>
                        <h5>Requested Females</h5>
                        <ChartjsBar data={requestedFemalesData} options={chartOptions} />
                    </div>
                </div>
            </div>
            <div className={Commanclasses["cartsContainer"]}>
                <div className={Commanclasses.Chart}>
                    <h2>Age wise users</h2>
                    {
                        ages.length > 0 ?
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={ages}
                                    cx={200}
                                    cy={200}
                                    labelLine={true}
                                    dataKey="count"
                                    nameKey="Age"
                                    innerRadius={60}
                                    outerRadius={100}
                                    label
                                >
                                    {ages.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                            : <div className={Commanclasses.emptydata}>
                                <img src={Icon} alt='empty Image' />
                            </div>}
                </div>

                <div className={Commanclasses.Chart}>
                    <h2>JobStatus wise users</h2>
                    {
                        jobstatus.length > 0 ?
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={jobstatus}
                                    dataKey="count"
                                    nameKey="JobStatus"
                                    cx={200}
                                    cy={200}
                                    labelLine={true}
                                    innerRadius={60}
                                    outerRadius={100}
                                    label
                                >
                                    {jobstatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                            : <div className={Commanclasses.emptydata}>
                                <img src={Icon} alt='empty Image' />
                            </div>}
                </div>
                <div className={Commanclasses.Chart}>
                    <h2>Gender wise users</h2>

                    {
                        genders.length > 0 ?
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={genders}
                                    dataKey="count"
                                    nameKey="Gender"
                                    cx={200}
                                    cy={200}
                                    labelLine={true}
                                    innerRadius={60}
                                    outerRadius={100}
                                    label
                                >
                                    {genders.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS3[index % COLORS3.length]} />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                            : <div className={Commanclasses.emptydata}>
                                <img src={Icon} alt='empty Image' />
                            </div>}

                </div>
                <div className={Commanclasses.Chart}>
                    <h2>Marital Status Records</h2>
                    {
                        meritalRecords?.length > 0 ?
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={meritalRecords}
                                    dataKey="count"
                                    nameKey="MaritalStatus"
                                    cx={200}
                                    cy={200}
                                    labelLine={true}
                                    innerRadius={60}
                                    outerRadius={100}
                                    label
                                >
                                    {meritalRecords.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS5[index % COLORS3.length]} />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                            : <div className={Commanclasses.emptydata}>
                                <img src={Icon} alt='empty Image' />
                            </div>}
                </div>

            </div>
            <div className={Commanclasses.Chart}>
                <h2>District Wise User</h2>
                {
                    citys.length > 0 ? (
                        <div style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={citys}
                                    margin={{ top: 5, right: 10, left: 40, bottom: 20 }}
                                    layout="vertical"
                                >
                                    <XAxis type="number" />
                                    <YAxis dataKey="District" type="category" stroke="#8884d8" />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#00C49F" barSize={40}>
                                        {citys.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS4[index]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className={Commanclasses.emptydata}>
                            <img src={Icon} alt='empty Image' />
                        </div>
                    )
                }
            </div>
            {/* <div className={Commanclasses.Chart}>
                <h2>District Wise User</h2>
                {citys.length > 0 ? (
                    <div style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
                        <Column {...config} />
                    </div>
                ) : (
                    <div className={Commanclasses.emptydata}>
                        <img src={Icon} alt='empty Image' />
                    </div>
                )}
            </div> */}
        </div>
    )
};

export default UserCategoryCahrts;