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
window.Buffer = window.Buffer || require("buffer").Buffer;
function AddSubcast() {
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  let location = useLocation();
  const subCatse = location.state || {};
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [mainLoad, setMainLoad] = useState(false);
  const Navigate = useNavigate();
  const [caste, setCaste] = useState([]);
  const [filteredCaste, setFilteredCaste] = useState([]);
  const [initial, setInitial] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const religionId = watch("ReligionID");

  const [religion, setReligion] = useState(null);
  const [casteID, setCasteID] = useState(null);

  const token = { Authorization: `token ${localStorage.getItem("token")}` };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let [AllReligions, AllCastes] = await Promise.all([
          Services.Religions("GET", null, token),
          Services.Cast("GET", null, token),
        ]);
        if (AllReligions?.Status === 1 && AllCastes?.Status === 1) {
          setData(AllReligions?.Religion);
          setCaste(AllCastes?.Result);
          setMainLoad(false);

          if (params.get("id") && subCatse && !initial) {
            setEdit(true);
            setInitial(true);

            setReligion(subCatse?.ReligionID);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    setMainLoad(true);
    fetchData();
  }, []);

  useEffect(() => {
    setValue("ReligionID", religion);
  }, [religion]);

  useEffect(() => {
    if (religionId) {
      let temp = [...caste];
      temp = temp.filter((c) => c.ReligionID === parseInt(religionId));
      setFilteredCaste(temp);
      setInitial(true);
      setCasteID(subCatse?.CasteID);
    } else {
      setFilteredCaste([]);
    }
  }, [religionId]);

  useEffect(() => {
    setValue("CasteID", casteID);
  }, [casteID]);

  const onSubmit = (data) => {
    setLoading(true);
    if (edit) {
      let body = data;
      Services.EditSubcast("PUT", JSON.stringify(body), token, params.get("id"))
        .then((response) => {
          if (response.Status === 1) {
            SuccessSwal("SubCaste Updated", response.Message);
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
      Services.AddSubcast("POST", JSON.stringify(data), token)
        .then((response) => {
          if (response.Status === 1) {
            Navigate(-1);
            SuccessSwal("SubCaste Added", response.Message);
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
    <Layout Active={"Subcaste"}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{edit ? "Update" : "Add"} SubCaste</title>
      </Helmet>
      {mainLoad && <MainLoader />}
      <div className={TutorClasses["Container"]}>
        <button onClick={backButton} className={TutorClasses["back"]}>
          Back
        </button>
        <div className={TutorClasses["wrapper"]}>
          <h3>{!edit ? "Add SubCaste" : "Update SubCaste"}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">
                Religion <span className="important">*</span>
              </label>
              <select
                {...register("ReligionID", {
                  required: "Religion is required",
                  valueAsNumber: true,
                })}
              >
                <option value="">Select Religion</option>
                {data.map((item) => (
                  <option key={item.ReligionID} value={item.ReligionID}>
                    {item.Religion}
                  </option>
                ))}
              </select>
              {errors.ReligionID && <span>{errors.ReligionID.message}</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">
                Caste <span className="important">*</span>
              </label>
              <select
                {...register("CasteID", {
                  required: "Caste is required",
                  valueAsNumber: true,
                })}
              >
                <option value="">Select Caste</option>
                {filteredCaste.map((item) => (
                  <option key={item.CasteID} value={item.CasteID}>
                    {item.Caste}
                  </option>
                ))}
              </select>
              {errors.CasteID && <span>{errors.CasteID.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">
                SubCaste <span className="important">*</span>
              </label>
              <input
                {...register("SubCaste", {
                  required: "this field is required",
                  validate: NullCheck,
                })}
                defaultValue={subCatse?.SubCaste || ""}
              />
              {errors.SubCaste && <span>{errors.SubCaste.message}</span>}
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

export default AddSubcast;
