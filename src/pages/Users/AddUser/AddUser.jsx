import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
import Multiselect from "multiselect-react-dropdown";
import moment from "moment";
import { FaTimes } from "react-icons/fa";

// window.Buffer = window.Buffer || require("buffer").Buffer;

function AddUser() {
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const [edit, setEdit] = useState(false);
  const [base64, setbase64] = useState("");
  const [documents, setDocuments] = useState([
    {
      DocumentType: "KYC",
      KYC_Type: "",
      Document: { FRONT: "", BACK: "", FRONTURL: "", BACKURL: "" },
    },
    {
      DocumentType: "INCOME",
      KYC_Type: "",
      Document: { FRONT: "", BACK: "", FRONTURL: "", BACKURL: "" },
    },
  ]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [pCaste, setPCaste] = useState([]);
  const [mainLoad, setMainLoad] = useState(false);
  const [heights, setHeights] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [caste, setCaste] = useState([]);
  const [religion, setReligion] = useState([]);
  const [subCaste, setSubCaste] = useState([]);
  const [profission, setProfission] = useState([]);
  const [pcategories, setPCategories] = useState([]);
  const [income, setIncome] = useState([]);
  const [locations, setLocations] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [filterCaste, setFilterCaste] = useState([]);
  const [filteredSubCaste, setFilteredSubCaste] = useState([]);
  const [selectedDOB, setSelectedDOB] = useState("");
  const [qCategories, setQCategories] = useState([]);
  const [init, setInit] = useState(true);
  const [anit, setAnit] = useState(true);
  const [imageUrl, setImageUrl] = useState([]);
  const [images, setImages] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [prefardCaste, setPrefardCaste] = useState([]);
  const [prefardSubCaste, setPrefardSubCaste] = useState([]);
  const [isdropdown, setIsDropDown] = useState(false);
  const [gender, setGender] = useState("");
  const Navigate = useNavigate();
  const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
  const filteredItems = AccessItems.filter(
    (item) => item.PageName === "Users"
  )[0];

  useEffect(() => {
    if (filteredItems?.CanWrite === 1 || filteredItems?.CanEdit === 1) {
      return;
    } else {
      Navigate("/forbidden");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
    watch,
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      Hobbies: [],
    },
  });

  const selectedReligion = watch("Religion");
  const selectedCaste = watch("Caste");
  const isSiblingsThere = watch("SiblingDetails");
  const jobStatus = watch("JobStatus");
  const preferdComunity = watch("Preferred_Community");
  const selectedPreferdCaste = watch("Preferred_Caste_List");

  const token = { Authorization: `token ${localStorage.getItem("token")}` };

  const getDropdowndata = async () => {
    try {
      const res = await Services.Dropdowndata("GET", null, token);
      if (res.Status === 1) {
        setLocations(res.Locations);
        setQualifications(res.Qualifications);
        setQCategories(res.QualificationCategories);
        setHobbies(res.Hobbies);
        setIncome(res.Income);
        setHeights(res.Heights);
        setReligion(res.Religion);
        setCaste(res.Caste);
        setSubCaste(res.SubCaste);
        setPCategories(res.ProfessionCategories);
        setProfission(res.Professions);
        setCities(res.City);
        setStates(res.State);
        setLanguages(res.Language);
        setIsDropDown(true);
      } else if (res.Status === 0) {
        warningSwal("Warning", res.Message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDropdowndata();
  }, []);

  const handleStateChange = (event) => {
    const stateValue = event.target.value;
    const stateSelected = states.find((state) => state.State === stateValue);
    console.log(stateSelected);

    if (stateSelected) {
      setSelectedState(stateSelected.StateID);
      const filteredC = cities.filter(
        (city) => city.StateID === stateSelected.StateID
      );
      console.log(filteredC);
      setCities(filteredC);
    } else {
      console.log("State not found");
    }
  };

  useEffect(() => {
    if (isdropdown) {
      if (params.get("id")) {
        setEdit(true);
        Services.EditById(
          "POST",
          JSON.stringify({ UserID: params.get("id") }),
          token
        )
          .then((response) => {
            setTimeout(() => {
              setLoading(false);
            }, 2500);
            if (response.Status === 1) {
              setCategoryDetails(response.User);
              setPCaste(response.Preferences);
              setbase64(response.User?.ProfilePicture);
              setUserImages(response.User?.UserImages);
              setImageUrl(
                response.User?.UserImages.map((item) => {
                  let data = String(item).split("/");
                  return data[data.length - 1];
                })
              );
              setImages([...response.User?.UserImages]);
              const doCuments = response?.Documents || [];
              if (doCuments.length > 0) {
                const updatedDocuments = doCuments.map((item, index) => {
                  const documentType = item?.DocumentType;
                  const kyctype = item?.KYC_Type;
                  const frontURL = item.Document?.FRONT;
                  const backURL = item.Document?.BACK;
                  const splitFrontURL = String(frontURL).split("/");
                  const splitBackURL = String(backURL).split("/");
                  const frontFileName = splitFrontURL[splitFrontURL.length - 1];
                  const backFileName = splitBackURL[splitBackURL.length - 1];

                  return {
                    DocumentType: documentType,
                    KYC_Type: kyctype,
                    Document: {
                      FRONT: frontFileName,
                      BACK: backFileName,
                      FRONTURL: frontURL,
                      BACKURL: backURL,
                    },
                  };
                });
                if (updatedDocuments.length === 1) {
                  updatedDocuments.push({
                    DocumentType: "",
                    KYC_Type: "",
                    Document: {
                      FRONT: "",
                      BACK: "",
                      FRONTURL: "",
                      BACKURL: "",
                    },
                  });
                }
                setDocuments(updatedDocuments);
              }

              let resetBody = { ...response?.User };
              delete resetBody?.UserImages;
              delete resetBody?.ProfilePicture;

              const statedata = states.find(
                (state) => state.State === response.User?.State
              );

              if (statedata) {
                setSelectedState(statedata.StateID);
                let filteredCities = cities.filter(
                  (city) => city.StateID === statedata.StateID
                );
                setCities(filteredCities);
              } else {
                setSelectedState(null);
                setCities([]);
              }

              reset({
                State: response?.User?.State,
                City: response.User?.City,
                KYC_Type: response.Documents[0]?.KYC_Type,
                UserName: response.User?.UserName,
                MobileNumber: response.User?.MobileNumber,
                SecondaryMobileNumber:
                  response.User?.SecondaryMobileNumber !== "NA"
                    ? response.User?.SecondaryMobileNumber
                    : "",
                DOB: moment(response.User?.DOB).format("YYYY-MM-DD"),
                Age: response.User?.Age,
                Gender: response.User?.Gender,
                MaritalStatus: response.User?.MaritalStatus,
                Height:
                  response.User?.Height_ft + "-" + response.User?.Height_In,
                Weight: response.User?.Weight,
                LanguagesKnown: response.User?.LanguagesKnown,
                Hobbies: response.User?.Hobbies,
                Bio: response.User?.Bio,
                Latitude: response.User?.Latitude,
                Longitude: response.User?.Longitude,
                Religion: response.User?.Religion,
                Rasi: response.User?.Rasi,
                Gothram: response.User?.Gothram,
                Star: response.User?.Star,
                MotherTongue: response.User?.MotherTongue,
                Surname: response.User?.Surname,
                Location: response.User?.Location,
                CreatedFor: response.User?.CreatedFor,
                PhysicalStatus: response.User?.PhysicalStatus,
                EmailID:
                  response.User?.EmailID !== "NA" ? response.User?.EmailID : "",
                // carer
                Company: response.Career?.Company,
                Profession: response.Career?.Profession,
                // AnnualCTC: `${response.Career?.FromIncome}-${response.Career?.ToIncome}`,
                JobLocation: response.Career?.JobLocation,
                HighestQualification: response.Career?.HighestQualification,
                College: response.Career?.College,
                JobStatus: response.Career?.JobStatus,
                Career_IncomeID: response.Career?.Career_IncomeID,
                // Family
                FatherName: response.FamilyDetails?.FatherName,
                FatherEmployment: response.FamilyDetails?.FatherEmployment,
                MotherName: response.FamilyDetails?.MotherName,
                // Family_MotherTongue: response.FamilyDetails?.Family_MotherTongue,
                MotherEmployment: response.FamilyDetails?.MotherEmployment,
                FamilyValues: response.FamilyDetails?.FamilyValues,
                FamilyAffluence: response.FamilyDetails?.FamilyAffluence,
                SiblingDetails: response.FamilyDetails?.SiblingDetails,
                Brothers: response.FamilyDetails?.Brothers,
                Sisters: response.FamilyDetails?.Sisters,
                Family_IncomeID: response.FamilyDetails?.Family_IncomeID,

                // Preferences
                Preferred_FromAge: response.Preferences?.Preferred_FromAge,
                Preferred_ToAge: response.Preferences?.Preferred_ToAge,
                Preferred_FromHeight:
                  response.Preferences?.Preferred_FromHeight_ft +
                  "-" +
                  response.Preferences?.Preferred_FromHeight_In,
                Preferred_ToHeight:
                  response.Preferences?.Preferred_ToHeight_ft +
                  "-" +
                  response.Preferences?.Preferred_ToHeight_In,
                Preferred_FromWeight:
                  response.Preferences?.Preferred_FromWeight,
                Preferred_ToWeight: response.Preferences?.Preferred_ToWeight,
                WithProfilePicture: response.Preferences?.WithProfilePicture,
                Preferred_PhysicalStatus:
                  response.Preferences?.Preferred_PhysicalStatus,
                Preferred_MaritalStatus:
                  response.Preferences?.Preferred_MaritalStatus,
                Preferred_MotherTongue:
                  response.Preferences?.Preferred_MotherTongue,
                Preferred_IncomeID: response.Preferences?.Preferred_IncomeID,
                Preferred_Profession:
                  response.Preferences?.Preferred_Profession,
                Preferred_Community: response.Preferences?.Preferred_Community,
                Preferred_Caste_List:
                  response.Preferences?.Preferred_Caste_List,
                Preferred_SubCaste_List:
                  response.Preferences?.Preferred_SubCaste_List,
                // Documnets
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
    }
  }, [params.get("id"), isdropdown]);

  useLayoutEffect(() => {
    if (params.get("id")) {
      setMainLoad(true);
    }
  }, []);

  useEffect(() => {
    if (!init) {
      setValue("Caste", "");
      setValue("SubCaste", "");
      if (selectedReligion) {
        let temp = [...caste];
        temp = temp.filter((e) => e.ReligionID === parseInt(selectedReligion));
        setFilterCaste(temp);
      } else {
        setFilterCaste([]);
      }
    } else {
      setFilterCaste(
        caste.filter((item) => item.ReligionID === selectedReligion)
      );
      setValue("Caste", categoryDetails.Caste);
    }
  }, [selectedReligion]);

  useEffect(() => {
    if (!init) {
      setValue("SubCaste", "");

      if (selectedCaste) {
        let temp1 = [...subCaste];
        temp1 = temp1.filter((e) => e.CasteID === parseInt(selectedCaste));
        setFilteredSubCaste(temp1);
      } else {
        setFilteredSubCaste([]);
      }
    } else {
      setFilteredSubCaste(
        subCaste.filter((e) => e.CasteID === parseInt(selectedCaste))
      );
      setValue("SubCaste", categoryDetails.SubCaste);
    }
  }, [selectedCaste]);

  useEffect(() => {
    if (!anit) {
      setValue("Preferred_Caste_List", "");
      if (preferdComunity) {
        let temp = [...caste];
        temp = temp.filter((e) => e.ReligionID === parseInt(preferdComunity));
        setPrefardCaste(temp);
      } else {
        setPrefardCaste([]);
      }
    } else {
      setPrefardCaste(
        caste.filter((item) => item.ReligionID == parseInt(preferdComunity))
      );
      setValue("Preferred_Caste_List", pCaste?.Preferred_Caste_List);
    }
  }, [preferdComunity]);

  useEffect(() => {
    if (selectedPreferdCaste && Array.isArray(selectedPreferdCaste)) {
      const filteredSubCaste = subCaste.filter((e) =>
        selectedPreferdCaste.includes(Number(e.CasteID))
      );

      setPrefardSubCaste(filteredSubCaste);

      // Set preferred sub-caste list
      setValue(
        "Preferred_SubCaste_List",
        pCaste?.Preferred_SubCaste_List || []
      );
    } else {
      setPrefardSubCaste([]);
      setValue("Preferred_SubCaste_List", []);
    }
  }, [selectedPreferdCaste, subCaste, pCaste, setValue]);

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
          setbase64(res?.Image !== "NA" ? res?.Image : "");
          setValue("ProfilePicture", res?.ImageID);
        } else if (res.Status === 0) {
          warningSwal("warning", res.Message);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  const filehandleChangeDocuments = (file, side, index) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert(`${file.name} is not a PNG, JPEG, or WebP image.`);
      return false;
    }

    let formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "Users");
    Services.UplaodImage("POST", formData, token)
      .then((res) => {
        if (res?.Status === 1) {
          const updatedDocuments = [...documents];
          updatedDocuments[index].Document[side] = res.ImageID;
          updatedDocuments[index].Document[`${side}URL`] = res.Image;
          setDocuments(updatedDocuments);
        } else {
          warningSwal("Upload failed: " + res.Message);
        }
      })
      .catch((err) => console.error(err));
  };

  function filehandleChangeUserImages(files, folderType) {
    let uploadedImages = [];
    let uploadedImageNames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const type = file.type;

      if (!["image/png", "image/jpeg", "image/webp"].includes(type)) {
        alert(`${file.name} is not a PNG, JPEG, or WebP image.`);
        return false;
      }

      // Prepare FormData for API call
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", folderType);

      Services.UplaodImage("POST", formData, token)
        .then((res) => {
          // console.log("Upload Response:", res);

          if (res?.Status === 1) {
            uploadedImages.push(res?.Image);
            uploadedImageNames.push(res?.ImageID);

            // Update state correctly
            setImages((prevImages) => [...prevImages, res?.Image]);
            setImageUrl((prevUrls) => [...prevUrls, res?.ImageID]);
          } else {
            warningSwal("Upload Failed:", res.Message);
          }
        })
        .catch((err) => {
          console.error("Upload Error:", err);
          alert("Failed to upload image. Please try again.");
        });
    }
    return true;
  }

  const handleDeleteImage = (url) => {
    const temp = [...images];
    const temp1 = [...imageUrl];
    const index = temp.indexOf(url);

    if (index > -1) {
      temp.splice(index, 1);
      temp1.splice(index, 1);
      setImages(temp);
      setImageUrl(temp1);
      setUserImages(temp);
    }
  };

  const handleDeleteImage2 = () => {
    setbase64("");
    setValue("ProfilePicture", "");
  };

  const onSubmit = (data) => {
    if (data.Gender == 1 && data.Age < 18) {
      setError("Age", {
        type: "manual",
        message: "Minimum age must be 18 for Female",
      });
      return;
    } else if (data.Gender == 2 && data.Age < 21) {
      setError("Age", {
        type: "manual",
        message: "Minimum age must be 21 for Male",
      });
      return;
    }

    if (edit) {
      let body = {
        ...data,
        UserImages: imageUrl,
        Documents: documents.map((doc, index) =>
          index == 0
            ? {
                DocumentType: doc.DocumentType,
                KYC_Type: data.KYC_Type,
                Document: {
                  FRONT: doc.Document.FRONT,
                  BACK: doc.Document.BACK,
                },
              }
            : {
                ...doc,
                Document: {
                  FRONT: doc.Document.FRONT,
                  BACK: doc.Document.BACK,
                },
              }
        ),
      };
      delete body.documents;
      console.log("body", body);
      Services.EditUser("PUT", JSON.stringify(body), token, params.get("id"))
        .then((response) => {
          if (response.Status === 1) {
            SuccessSwal("User Updated", response.Message);
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
      let body = {
        ...data,
        UserImages: imageUrl,
        Documents: documents.map((doc, index) =>
          index == 0 ? { ...doc, KYC_Type: data.KYC_Type } : { ...doc }
        ),
      };
      delete body.documents;
      console.log("body", body);
      Services.AddUser("POST", JSON.stringify(body), token)
        .then((response) => {
          if (response.Status === 1) {
            Navigate(-1);
            SuccessSwal("User Added", response.Message);
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

  const rasiList = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  const starList = [
    "Ashwini",
    "Pushya",
    "Hasta",
    "Mrigashira",
    "Chitra",
    "Anuradha",
    "Revathi",
    "Rohini",
    "Uttara",
    "Phalguni",
    "Uttarashada",
    "Uttarabhadra",
    "Punarvasu",
    "Swati",
    "Shravana",
    "Dhanishta",
    "Shatabisha",
    "Ardra",
    "Ashlesha",
    "Jyestha",
    "Moola",
    "Bharani",
    "Magha",
    "Purva",
    "Phalguni",
    "Purvashada",
    "Purvabhadra",
    "Krittika",
    "Vishakha",
  ];

  const profileTypes = [
    { id: 0, name: "Self" },
    { id: 3, name: "Brother" },
    { id: 4, name: "Sister" },
    { id: 5, name: "Relative" },
    { id: 6, name: "Friend" },
  ];

  const familyCategories = [
    { id: 1, category: "Lower Middle Class" },
    { id: 2, category: "Middle Class" },
    { id: 3, category: "Upper Middle Class" },
    { id: 4, category: "Rich" },
  ];

  const brothers = [
    { id: 0, name: "0 Brothers " },
    { id: 1, name: "1 Brothers " },
    { id: 2, name: "2 Brothers " },
    { id: 3, name: "3 Brothers" },
    { id: 4, name: "4 Brothers" },
    { id: 5, name: "5 Brothers" },
    { id: 6, name: "6 Brothers" },
    { id: 7, name: "7 Brothers" },
    { id: 8, name: "8 Brothers " },
    { id: 9, name: "9 Brothers" },
    { id: 10, name: "10 Brothers" },
  ];

  const sisters = [
    { id: 0, name: "0 Sisters " },
    { id: 1, name: "1 Sisters " },
    { id: 2, name: "2 Sisters " },
    { id: 3, name: "3 Sisters" },
    { id: 4, name: "4 Sisters" },
    { id: 5, name: "5 Sisters" },
    { id: 6, name: "6 Sisters" },
    { id: 7, name: "7 Sisters" },
    { id: 8, name: "8 Sisters " },
    { id: 9, name: "9 Sisters" },
    { id: 10, name: "10 Sisters" },
  ];

  const conveter = (body) => {
    if (body >= 10000000) {
      return "Rs. " + body / 10 ** 7 + "crore +";
    } else if (body == null) {
      return "1crore+";
    } else {
      return "Rs. " + body / 10 ** 5 + "Lakhs";
    }
  };

  const ages = Array.from({ length: 60 - 18 + 1 }, (_, i) => i + 18);

  const weights = Array.from({ length: 111 }, (_, i) => i + 40);

  const calculateAge = (dob) => {
    return moment().diff(dob, "years", false);
  };

  const onDOBChange = (event) => {
    const dob = event.target.value;
    setSelectedDOB(dob);
    const age = calculateAge(dob);
    setValue("Age", age, { shouldValidate: true });
  };

  const onGenderChange = (event) => {
    setGender(event.target.value);
  };

  const validateAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18 || age > 60) {
      return "Age must be between 18 and 60 years";
    }
    return true;
  };
  return (
    <Layout Active={"Users"}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{edit ? "Update" : "Add"} User</title>
      </Helmet>
      {mainLoad && <MainLoader />}
      <div className={TutorClasses["Container"]}>
        <button onClick={backButton} className={TutorClasses["back"]}>
          Back
        </button>
        <div className={TutorClasses["wrapper"]}>
          <h3>{!edit ? "Add User" : "Update User"}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>User Details</h3>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">
                First Name <span className="important">*</span>
              </label>
              <input
                {...register("UserName", {
                  required: "this field is required",
                })}
              />
              {errors.UserName && <span>{errors.UserName.message}</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Sur Name">
                Sur Name <span className="important">*</span>
              </label>
              <input
                {...register("Surname", {
                  required: "this field is required",
                })}
              />
              {errors.Surname && <span>{errors.Surname.message}</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Gender">
                Gender <span className="important">*</span>
              </label>
              <select
                {...register("Gender", {
                  onChange: (e) => onGenderChange(e),
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select Gender</option>
                <option value={1}>Female</option>
                <option value={2}>Male</option>
              </select>
              {errors.Gender && <span>This field is required</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">
                DOB <span className="important">*</span>
              </label>
              <input
                type="date"
                {...register("DOB", {
                  required: "this field is required",
                  onChange: onDOBChange,
                  //validate: validateAge
                })}
              />

              {errors.DOB && <span>{errors.DOB.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Age">
                Age <span className="important">*</span>
              </label>
              <input
                {...register("Age", {
                  required: false,
                  valueAsNumber: true,
                  validate: (value) => value >= 0 || "Invalid age",
                })}
                readOnly
              />

              {errors.Age && <span>{errors.Age.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="MaritalStatus">
                Marital Status <span className="important">*</span>
              </label>
              <select
                {...register("MaritalStatus", {
                  required: "Marital Status is required",
                  valueAsNumber: true,
                })}
              >
                <option value="">Select MaritalStatus</option>
                <option value={1}>Never Married</option>
                <option value={2}>Divorced</option>
              </select>
              {errors.MaritalStatus && <span>This field is required</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Mother Tongue">
                Mother Tongue <span className="important">*</span>
              </label>
              <select
                {...register("MotherTongue", {
                  required: "Mother Tongue id is required",
                })}
              >
                <option value="">Select MotherTongue</option>
                {languages.map((lang) => (
                  <option key={lang.LanguageID} value={lang.Language}>
                    {lang.Language}
                  </option>
                ))}
              </select>
              {errors.MotherTongue && <span>This field is required</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="EmailID">EmailID</label>
              <input
                {...register("EmailID", {
                  required: false,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.EmailID && <span>{errors.EmailID.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">
                Mobile Number <span className="important">*</span>
              </label>
              <input
                {...register("MobileNumber", {
                  required: "Mobile Number is required",
                  pattern: {
                    value: /^[6-9][0-9]{9}$/,
                    message:
                      "Please enter a valid 10-digit mobile number starting with 6-9",
                  },
                })}
                maxLength={10}
                disabled={edit}
              />
              {errors.MobileNumber && (
                <span>{errors.MobileNumber.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="SecondaryMobileNumber">Contact Number</label>
              <input
                {...register("SecondaryMobileNumber", {
                  required: false,
                  pattern: {
                    value: /^[6-9][0-9]{9}$/,
                    message:
                      "Please enter a valid 10-digit mobile number starting with 6-9",
                  },
                })}
                maxLength={10}
              />
              {errors.SecondaryMobileNumber && (
                <span>{errors.SecondaryMobileNumber.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Height">Height</label>
              <select
                {...register("Height", {
                  required: false,
                  valueAsNumber: false,
                })}
              >
                <option value="">Select Height</option>
                {heights?.map((height, index) => (
                  <option
                    key={height?.HeightID}
                    value={height?.Height_ft + "-" + height?.Height_In}
                  >
                    {height?.Height_ft}ft{" ."}
                    {height?.Height_In}in
                  </option>
                ))}
              </select>
              {errors?.Height && <span>This field is required</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Weight">Weight</label>
              <select
                {...register("Weight", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select Weight</option>
                {weights.map((weight, index) => (
                  <option key={weight} value={weight}>
                    {weight}
                    {` kg`}
                  </option>
                ))}
              </select>
              {errors.Weight && <span>This field is required</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Languages Known</label>
              <Controller
                name="LanguagesKnown"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Multiselect
                    avoidHighlightFirstOption
                    options={languages}
                    displayValue="Language"
                    onSelect={(selectedList) => {
                      const languagesString = selectedList
                        .map((lang) => lang.Language)
                        .join(",");
                      field.onChange(languagesString);
                    }}
                    onRemove={(selectedList) => {
                      const languagesString = selectedList
                        .map((lang) => lang.Language)
                        .join(",");
                      field.onChange(languagesString);
                    }}
                    selectedValues={
                      field.value
                        ? languages.filter((lang) =>
                            field.value.split(",").includes(lang.Language)
                          )
                        : []
                    }
                    placeholder="Select Languages"
                  />
                )}
              />
              {errors.LanguagesKnown && (
                <span>{errors.LanguagesKnown.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Weight">Hobbies</label>
              <Controller
                name="Hobbies"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Multiselect
                    avoidHighlightFirstOption
                    options={hobbies}
                    displayValue="Hobbie"
                    onSelect={(selectedList) => {
                      const ids = selectedList.map((hobbie) => hobbie.HobbieID);
                      field.onChange(ids);
                    }}
                    onRemove={(selectedList) => {
                      const ids = selectedList.map((hobbie) => hobbie.HobbieID);
                      field.onChange(ids);
                    }}
                    selectedValues={hobbies.filter((hobbie) =>
                      field.value.includes(hobbie.HobbieID)
                    )}
                    placeholder="Select Hobbies"
                  />
                )}
              />
              {errors.Hobbies && <span>This field is required</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Bio</label>
              <input
                {...register("Bio", {
                  required: false,
                })}
              />
              {errors.Bio && <span>{errors.Bio.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="MaritalStatus">
                Created For <span className="important">*</span>
              </label>
              <select
                {...register("CreatedFor", {
                  required: "Created For  is required",
                })}
              >
                <option value="">Select CreatedFor</option>
                {profileTypes.map((profile, index) => (
                  <option key={profile.id} value={profile.name}>
                    {profile.name}
                  </option>
                ))}
              </select>
              {errors.CreatedFor && <span>This field is required</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="PhysicalStatus">Physical Status</label>
              <select
                {...register("PhysicalStatus", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="" disabled selected>
                  Select Status
                </option>
                <option value={2}>Disability</option>
                <option value={1}>No Disability</option>
              </select>
              {errors.PhysicalStatus && <span>This field is required</span>}
            </div>
            <div className={TutorClasses["file-upload-wrapper"]}>
              <header>
                <h3>Upload profile pic</h3>
              </header>
              <FileUploader
                classes={TutorClasses["upload-image"]}
                multiple={false}
                handleChange={(file) => filehandleChange(file, "Users")}
                name="file"
                children={fileuploadDesign}
              />
            </div>
            {base64 && (
              <div className={TutorClasses["file-images-wrapper"]}>
                <div className={TutorClasses.image_container}>
                  <img
                    src={base64 !== "NA" ? base64 : ""}
                    alt="uploaded-data"
                    onClick={() => {
                      window.open(base64, "_blank");
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage2()}
                    className={TutorClasses["imageremover"]}
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>
            )}
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Latitude</label>
              <input
                {...register("Latitude", {
                  required: false,
                  valueAsNumber: true,
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: "Only valid Latitude values are allowed",
                  },
                })}
              />
              {errors.Latitude && <span>{errors.Latitude.message}</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Longitude</label>
              <input
                {...register("Longitude", {
                  required: false,
                  valueAsNumber: true,
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: "Only valid longitude values are allowed",
                  },
                })}
              />
              {errors.Longitude && <span>{errors.Longitude.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="State">
                State <span className="important">*</span>
              </label>
              <select
                {...register("State", {
                  required: false,
                  onChange: handleStateChange,
                })}
              >
                <option value="">Select State</option>
                {states.map((state) => {
                  return (
                    <option key={state.StateID} value={state.State}>
                      {state.State}
                    </option>
                  );
                })}
              </select>
              {errors.State && <span>{errors.State.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="City">
                City <span className="important">*</span>
              </label>
              <select
                {...register("City", {
                  required: false,
                })}
              >
                <option value="">Select City</option>
                {cities.map((city) => {
                  return (
                    <option key={city.CityID} value={city.City}>
                      {city.City}
                    </option>
                  );
                })}
              </select>
              {errors.City && <span>{errors.City.message}</span>}
            </div>

            <h3>Caste & Community</h3>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Religion">
                Religion <span className="important">*</span>
              </label>
              <select
                {...register("Religion", {
                  required: "Religion is required",
                  valueAsNumber: true,
                })}
                onClick={() => {
                  setInit(false);
                  setCategoryDetails([]);
                }}
              >
                <option value="">Select Religion</option>
                {religion.map((religion, index) => (
                  <option key={religion.Religion} value={religion.ReligionID}>
                    {religion.Religion}
                  </option>
                ))}
              </select>
              {errors.Religion && <span>This field is required</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Weight">
                Caste <span className="important">*</span>
              </label>
              <select
                {...register("Caste", {
                  required: "Caste is required",
                  valueAsNumber: true,
                })}
                onClick={() => {
                  setInit(false);
                  setCategoryDetails([]);
                }}
                value={categoryDetails.Caste}
              >
                <option value="">Select Caste</option>
                {filterCaste.map((Caste, index) => (
                  <option key={Caste.Caste} value={Caste.CasteID}>
                    {Caste.Caste}
                  </option>
                ))}
              </select>
              {errors.Caste && <span>This field is required</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Weight">Sub Caste</label>
              <select
                {...register("SubCaste", {
                  required: false,
                  valueAsNumber: true,
                })}
                onClick={() => {
                  setInit(false);
                  setCategoryDetails([]);
                }}
                value={categoryDetails.SubCaste}
              >
                <option value="">Select Subcaste</option>
                {filteredSubCaste.map((subCaste, index) => (
                  <option key={subCaste.SubCaste} value={subCaste.SubCasteID}>
                    {subCaste.SubCaste}
                  </option>
                ))}
              </select>
              {errors.SubCaste && <span>This field is required</span>}
            </div>

            <h3>Astro</h3>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Rasi</label>
              <select
                {...register("Rasi", {
                  required: false,
                })}
              >
                <option value="">Select Rasi</option>
                {rasiList.map((rasi, index) => (
                  <option key={index} value={rasi}>
                    {rasi}
                  </option>
                ))}
              </select>
              {errors.Rasi && <span>{errors.Rasi.message}</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Gothram</label>
              <input
                {...register("Gothram", {
                  required: false,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Gothram is required",
                  },
                })}
              />
              {errors.Gothram && <span>{errors.Gothram.message}</span>}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Star</label>
              <select
                {...register("Star", {
                  required: false,
                })}
              >
                <option value="">Select Star</option>
                {starList.map((star, index) => (
                  <option key={index} value={star}>
                    {star}
                  </option>
                ))}
              </select>
              {errors.Star && <span>{errors.Star.message}</span>}
            </div>
            <h3>Career & Education</h3>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobStatus">
                Job Status <span className="important">*</span>
              </label>
              <select
                {...register("JobStatus", {
                  required: false,
                })}
              >
                <option value="">select Job Status</option>
                <option value={"Working"}>Working</option>
                <option value={"Not Working"}>Not Working</option>
              </select>
              {errors.JobStatus && <span>{errors.JobStatus.message}</span>}
            </div>
            {jobStatus == "Working" && (
              <>
                <div className={TutorClasses["form-control"]}>
                  <label htmlFor="First Name">
                    Company <span className="important">*</span>
                  </label>
                  <input
                    {...register("Company", {
                      required: false,
                      // pattern: {
                      //     value: /^[A-Za-z\s]+$/,
                      //     message: "Only letters and spaces are allowed",
                      // },
                    })}
                  />
                  {errors.Company && <span>{errors.Company.message}</span>}
                </div>

                <div className={TutorClasses["form-control"]}>
                  <label htmlFor="First Name">
                    Profession <span className="important">*</span>
                  </label>
                  <select
                    {...register("Profession", {
                      required: false,
                    })}
                  >
                    <option value="">Select Profession</option>
                    {pcategories.map((category) => (
                      <optgroup
                        key={category.Profession_CategoryID}
                        label={category.Profession_CategoryName}
                      >
                        {profission
                          .filter(
                            (item) =>
                              item.Profession_CategoryID ===
                              category.Profession_CategoryID
                          )
                          .map((item) => (
                            <option
                              key={item.ProfessionID}
                              value={item.ProfessionID}
                            >
                              {item.ProfessionName}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.Profession && (
                    <span>{errors.Profession.message}</span>
                  )}
                </div>

                <div className={TutorClasses["form-control"]}>
                  <label htmlFor="First Name">
                    Annual CTC <span className="important">*</span>
                  </label>
                  <select
                    {...register("Career_IncomeID", {
                      required: false,
                      valueAsNumber: true,
                    })}
                  >
                    <option value={""}>Select Annual CTC</option>
                    {income.map((item, index) => {
                      return (
                        <option key={item.IncomeID} value={item.IncomeID}>
                          {conveter(item.FromIncome)}
                          {item?.IsAbove === 1 ? "" : " - "}
                          {item?.IsAbove === 1 ? "" : conveter(item.ToIncome)}
                        </option>
                      );
                    })}
                  </select>
                  {errors.Career_IncomeID && (
                    <span>{errors.Career_IncomeID.message}</span>
                  )}
                </div>

                <div className={TutorClasses["form-control"]}>
                  <label htmlFor="JobLocation">
                    Job Location <span className="important">*</span>
                  </label>
                  <select
                    {...register("JobLocation", {
                      required: false,
                    })}
                  >
                    <option value="">Select Job Loaction</option>
                    {locations.map((location) => {
                      return (
                        <option
                          key={location.Location}
                          value={location.Location}
                        >
                          {location.Location}
                        </option>
                      );
                    })}
                  </select>
                  {errors.JobLocation && (
                    <span>{errors.JobLocation.message}</span>
                  )}
                </div>
              </>
            )}
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">
                H Qualification <span className="important">*</span>
              </label>
              <select
                {...register("HighestQualification", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select Qualification</option>
                {qCategories.map((category) => (
                  <optgroup
                    key={category.Qualification_CategoryID}
                    label={category.Qualification_CategoryName}
                  >
                    {qualifications
                      .filter(
                        (item) =>
                          item.Qualification_CategoryID ===
                          category.Qualification_CategoryID
                      )
                      .map((item, index) => (
                        <option
                          key={item.QualificationID}
                          value={item.QualificationID}
                        >
                          {item.QualificationName}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              {errors.HighestQualification && (
                <span>{errors.HighestQualification.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">
                College <span className="important">*</span>
              </label>
              <input
                {...register("College", {
                  required: false,
                  // pattern: {
                  //     value: /^[A-Za-z\s]+$/,
                  //     message: "College is required"
                  // }
                })}
              />
              {errors.College && <span>{errors.College.message}</span>}
            </div>
            <h3>Family Details</h3>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Father Name</label>
              <input
                {...register("FatherName", {
                  required: false,
                  // pattern: {
                  //     value: /^[A-Za-z\s]+$/,
                  //     message: "FatherName is required"
                  // }
                })}
              />
              {errors.FatherName && <span>{errors.FatherName.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Father Employment</label>
              <select
                {...register("FatherEmployment", {
                  required: false,
                })}
              >
                <option value="">Select option</option>
                {pcategories.map((category) => (
                  <optgroup
                    key={category.Profession_CategoryID}
                    label={category.Profession_CategoryName}
                  >
                    {profission
                      .filter(
                        (item) =>
                          item.Profession_CategoryID ===
                          category.Profession_CategoryID
                      )
                      .map((item, index) => (
                        <option key={index} value={item.ProfessionName}>
                          {item.ProfessionName}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              {errors.FatherEmployment && (
                <span>{errors.FatherEmployment.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Mother Name</label>
              <input
                {...register("MotherName", {
                  required: false,
                  // pattern: {
                  //     value: /^[A-Za-z\s]+$/,
                  //     message: "Mother Name is required"
                  // }
                })}
              />
              {errors.MotherName && <span>{errors.MotherName.message}</span>}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Mother Employment</label>
              <select
                {...register("MotherEmployment", {
                  required: false,
                })}
              >
                <option value="">Select option</option>
                {pcategories.map((category) => (
                  <optgroup
                    key={category.Profession_CategoryID}
                    label={category.Profession_CategoryName}
                  >
                    {profission
                      .filter(
                        (item) =>
                          item.Profession_CategoryID ===
                          category.Profession_CategoryID
                      )
                      .map((item, index) => (
                        <option key={index} value={item.ProfessionName}>
                          {item.ProfessionName}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              {errors.MotherEmployment && (
                <span>{errors.MotherEmployment.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="Annual Income">Annual Income</label>
              <select
                {...register("Family_IncomeID", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value={""}>Select Annual Income</option>
                {income.map((item, index) => {
                  return (
                    <option key={item.IncomeID} value={item.IncomeID}>
                      {conveter(item.FromIncome)}
                      {item?.IsAbove === 1 ? "" : " - "}
                      {item?.IsAbove === 1 ? "" : conveter(item.ToIncome)}
                    </option>
                  );
                })}
              </select>
              {errors.Family_IncomeID && (
                <span>{errors.Family_IncomeID.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Family Type</label>
              <select
                {...register("FamilyValues", {
                  required: false,
                })}
              >
                <option value={""}>Select Family Type</option>
                <option value="Joint">Joint</option>
                <option value="Nuclear">Nuclear</option>
                <option value="Single Parent">Single Parent</option>
              </select>
              {errors.FamilyValues && (
                <span>{errors.FamilyValues.message}</span>
              )}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Family Affluence</label>
              <select
                {...register("FamilyAffluence", {
                  required: false,
                })}
              >
                <option value="">Select Type</option>
                {familyCategories?.map((item) => {
                  return (
                    <option key={item.category} value={item.category}>
                      {item.category}
                    </option>
                  );
                })}
              </select>
              {errors.FamilyAffluence && (
                <span>{errors.FamilyAffluence.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Sibling Details</label>
              <select
                {...register("SiblingDetails", {
                  required: false,
                  valueAsNumber: false,
                })}
              >
                <option value="">Select option</option>
                <option value={"No"}>No</option>
                <option value={"Yes"}>Yes</option>
              </select>
              {errors.SiblingDetails && (
                <span>{errors.SiblingDetails.message}</span>
              )}
            </div>

            {isSiblingsThere == "Yes" && (
              <>
                <div className={TutorClasses["form-control"]}>
                  <label htmlFor="JobLocation">Brothers</label>
                  <select
                    {...register("Brothers", {
                      required: false,
                    })}
                  >
                    <option value="">Select option</option>
                    {brothers.map((brother) => (
                      <option key={brother.id} value={brother.id}>
                        {brother.name}
                      </option>
                    ))}
                  </select>
                  {errors.Brothers && <span>{errors.Brothers.message}</span>}
                </div>

                <div className={TutorClasses["form-control"]}>
                  <label htmlFor="JobLocation">Sisters</label>
                  <select
                    {...register("Sisters", {
                      required: false,
                    })}
                  >
                    <option value="">Select option</option>
                    {sisters.map((sister) => (
                      <option key={sister.id} value={sister.id}>
                        {sister.name}
                      </option>
                    ))}
                  </select>
                  {errors.Sisters && <span>{errors.Sisters.message}</span>}
                </div>
              </>
            )}
            <h3>Partner Preference</h3>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">FromAge</label>
              <select
                {...register("Preferred_FromAge", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value={""}>Select FromAge</option>
                {ages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                    {" Years"}
                  </option>
                ))}
              </select>
              {errors.Preferred_FromAge && (
                <span>{errors.Preferred_FromAge.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">ToAge</label>
              <select
                {...register("Preferred_ToAge", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value={""}>Select ToAge</option>
                {ages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                    {" Years"}
                  </option>
                ))}
              </select>
              {errors.Preferred_ToAge && (
                <span>{errors.Preferred_ToAge.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">From Height</label>
              <select
                {...register("Preferred_FromHeight", {
                  required: false,
                  valueAsNumber: false,
                })}
              >
                <option value="">Select From Height</option>
                {heights.map((height) => (
                  <option
                    key={height.HeightID}
                    value={height?.Height_ft + "-" + height?.Height_In}
                  >
                    {height.Height_ft}ft{" ."}
                    {height.Height_In}in
                  </option>
                ))}
              </select>
              {errors.Preferred_FromHeight && (
                <span>{errors.Preferred_FromHeight.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">To Height</label>
              <select
                {...register("Preferred_ToHeight", {
                  required: false,
                  valueAsNumber: false,
                })}
              >
                <option value="">Select To Height</option>
                {heights.map((height) => (
                  <option
                    key={height.HeightID}
                    value={height?.Height_ft + "-" + height?.Height_In}
                  >
                    {height.Height_ft}ft{" ."}
                    {height.Height_In}in
                  </option>
                ))}
              </select>
              {errors.Preferred_ToHeight && (
                <span>{errors.Preferred_ToHeight.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">From weight</label>
              <select
                {...register("Preferred_FromWeight", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select From Weight</option>
                {weights.map((weight, index) => (
                  <option key={weight} value={weight}>
                    {weight} {" kg"}
                  </option>
                ))}
              </select>
              {errors.Preferred_FromWeight && (
                <span>{errors.Preferred_FromWeight.message}</span>
              )}
            </div>
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">To weight</label>
              <select
                {...register("Preferred_ToWeight", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select To weight</option>
                {weights.map((weight, index) => (
                  <option key={weight} value={weight}>
                    {weight} {" kg"}
                  </option>
                ))}
              </select>
              {errors.Preferred_ToWeight && (
                <span>{errors.Preferred_ToWeight.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Profile picture</label>
              <select
                {...register("WithProfilePicture", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select option</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              {errors.WithProfilePicture && (
                <span>{errors.WithProfilePicture.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Physical Status</label>
              <select
                {...register("Preferred_PhysicalStatus", {
                  required: false,
                })}
              >
                <option value="">Select Physical Status</option>
                <option value={"No Disability"}>No Disability</option>
                <option value={"Disability"}>Disability</option>
              </select>
              {errors.Preferred_PhysicalStatus && (
                <span>this field is required</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Marital Status</label>
              <select
                {...register("Preferred_MaritalStatus", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select MaritalStatus</option>
                <option value={1}>Never Married</option>
                <option value={2}>Divorced</option>
              </select>
              {errors.Preferred_MaritalStatus && (
                <span>{errors.Preferred_MaritalStatus.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Mother Tongue</label>

              <select
                {...register("Preferred_MotherTongue", {
                  required: false,
                })}
              >
                <option value="">Select MotherTongue</option>
                {languages.map((lang, index) => (
                  <option key={lang.LanguageID} value={lang.Language}>
                    {lang.Language}
                  </option>
                ))}
              </select>
              {errors.Preferred_MotherTongue && (
                <span>this field is require</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Profession</label>
              <select
                {...register("Preferred_Profession", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select Profession</option>
                {pcategories.map((category) => (
                  <optgroup
                    key={category.Profession_CategoryID}
                    label={category.Profession_CategoryName}
                  >
                    {profission
                      .filter(
                        (item) =>
                          item.Profession_CategoryID ===
                          category.Profession_CategoryID
                      )
                      .map((item, index) => (
                        <option
                          key={item.ProfessionID}
                          value={item.ProfessionID}
                        >
                          {item.ProfessionName}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              {errors.Preferred_Profession && (
                <span>{errors.Preferred_Profession.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Annual Income</label>
              <select
                {...register("Preferred_IncomeID", {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value="">Select From Income</option>
                {income.map((income) => (
                  <option key={income.IncomeID} value={income.IncomeID}>
                    {conveter(income.FromIncome)}
                    {income?.IsAbove === 1 ? "" : " - "}
                    {income?.IsAbove === 1 ? "" : conveter(income.ToIncome)}
                  </option>
                ))}
              </select>
              {errors.Preferred_IncomeID && (
                <span>{errors.Preferred_IncomeID.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="JobLocation">Community</label>
              <select
                {...register("Preferred_Community", {
                  required: false,
                  valueAsNumber: true,
                })}
                onClick={() => {
                  setAnit(false);
                  setPCaste([]);
                }}
              >
                <option value=""> Select Community</option>
                {religion.map((Community) => (
                  <option
                    key={Community.ReligionID}
                    value={Community.ReligionID}
                  >
                    {Community.Religion}
                  </option>
                ))}
              </select>
              {errors.Preferred_Community && (
                <span>{errors.Preferred_Community.message}</span>
              )}
            </div>

            {/* <div className={TutorClasses["form-control"]}>
                            <label htmlFor="JobLocation">
                                Caste
                            </label>
                            <select
                                {...register("Preferred_Caste", {
                                    required: false,
                                    valueAsNumber: true,
                                })}
                                value={pCaste?.Preferred_Caste}
                            >
                                <option value="">Select Caste</option>
                                {prefardCaste?.map((Caste, index) => (
                                    <option key={Caste?.CasteID} value={Caste?.CasteID}>
                                        {Caste?.Caste}
                                    </option>
                                ))}
                            </select>
                            {errors.Preferred_Caste && (
                                <span>{errors.Preferred_Caste.message}</span>
                            )}
                        </div> */}
            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Caste</label>
              <Controller
                name="Preferred_Caste_List"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Multiselect
                    avoidHighlightFirstOption
                    options={prefardCaste}
                    displayValue="Caste"
                    onSelect={(selectedList) => {
                      const selectedCasteArray = selectedList.map(
                        (item) => item.CasteID
                      );
                      field.onChange(selectedCasteArray);
                    }}
                    onRemove={(selectedList) => {
                      const selectedCasteArray = selectedList.map(
                        (item) => item.CasteID
                      );
                      field.onChange(selectedCasteArray);
                    }}
                    selectedValues={
                      field.value && Array.isArray(field.value)
                        ? prefardCaste.filter((item) =>
                            field.value.includes(item.CasteID)
                          )
                        : []
                    }
                    placeholder="Select Castes"
                  />
                )}
              />
              {errors.Preferred_Caste_List && (
                <span>{errors.Preferred_Caste_List.message}</span>
              )}
            </div>

            <div className={TutorClasses["form-control"]}>
              <label htmlFor="First Name">Sub Caste</label>
              <Controller
                name="Preferred_SubCaste_List"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Multiselect
                    avoidHighlightFirstOption
                    options={prefardSubCaste}
                    displayValue="SubCaste"
                    onSelect={(selectedList) => {
                      const selectedSubCasteArray = selectedList.map(
                        (item) => item.SubCasteID
                      );
                      field.onChange(selectedSubCasteArray);
                    }}
                    onRemove={(selectedList) => {
                      const selectedSubCasteArray = selectedList.map(
                        (item) => item.SubCasteID
                      );
                      field.onChange(selectedSubCasteArray);
                    }}
                    selectedValues={
                      field.value && Array.isArray(field.value)
                        ? prefardSubCaste.filter((item) =>
                            field.value.includes(item.SubCasteID)
                          )
                        : []
                    }
                    placeholder="Select Sub Caste"
                  />
                )}
              />
              {errors.Preferred_SubCaste_List && (
                <span>{errors.Preferred_SubCaste_List.message}</span>
              )}
            </div>

            <h3>User Documents </h3>

            {documents.map((doc, index) => (
              <div key={index} className={TutorClasses["document-section"]}>
                <div className={TutorClasses["form-control"]}>
                  <label>Document Type:</label>
                  {index === 0 ? (
                    <select {...register("KYC_Type", { required: false })}>
                      <option value="">Select KYC Type</option>
                      <option value={"Aadhar Card"}>Aadhar Card</option>
                      <option value={"PAN Card"}>Pan Card</option>
                    </select>
                  ) : (
                    <Controller
                      name={`documents[${index}].KYC_Type`}
                      control={control}
                      defaultValue={doc.KYC_Type}
                      render={({ field }) => (
                        <input {...field} disabled value="INCOME" />
                      )}
                    />
                  )}
                </div>
                {watch("KYC_Type") && watch("KYC_Type") != "NA" && (
                  <>
                    <div className={TutorClasses["file-upload-wrapper"]}>
                      <header>
                        <h3>Upload Front Image</h3>
                      </header>
                      <FileUploader
                        classes={TutorClasses["upload-image"]}
                        multiple={false}
                        handleChange={(file) =>
                          filehandleChangeDocuments(file, "FRONT", index)
                        }
                        name="file"
                        children={fileuploadDesign}
                      />
                    </div>
                    {doc?.Document?.FRONTURL && doc?.Document?.FRONTURL && (
                      <div className={TutorClasses["file-images-wrapper"]}>
                        <div className={TutorClasses["image"]}>
                          <img
                            src={doc?.Document?.FRONTURL}
                            alt="uploaded-data"
                            onClick={() => {
                              window.open(doc?.Document?.FRONTURL, "_blank");
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <Controller
                      name={`documents[${index}].Document.FRONT`}
                      control={control}
                      defaultValue={doc?.Document?.FRONT}
                      render={({ field }) => <input type="hidden" {...field} />}
                    />

                    <div className={TutorClasses["file-upload-wrapper"]}>
                      <header>
                        <h3>Upload Back Image</h3>
                      </header>
                      <FileUploader
                        classes={TutorClasses["upload-image"]}
                        multiple={false}
                        handleChange={(file) =>
                          filehandleChangeDocuments(file, "BACK", index)
                        }
                        name="file"
                        children={fileuploadDesign}
                      />
                    </div>
                    {doc?.Document?.BACKURL && doc?.Document?.BACKURL && (
                      <div className={TutorClasses["file-images-wrapper"]}>
                        <div className={TutorClasses["image"]}>
                          <img
                            src={doc?.Document?.BACKURL}
                            alt="uploaded-data"
                            onClick={() => {
                              window.open(doc?.Document?.BACKURL, "_blank");
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <Controller
                      name={`documents[${index}].Document.BACK`}
                      control={control}
                      defaultValue={doc?.Document?.BACK}
                      render={({ field }) => <input type="hidden" {...field} />}
                    />
                  </>
                )}
              </div>
            ))}

            <h3>User Images </h3>

            <div className={TutorClasses["file-upload-wrapper"]}>
              <header>
                <h3>
                  Upload Images <span className="important">*</span>
                </h3>
              </header>
              <FileUploader
                classes={TutorClasses["upload-image"]}
                multiple={true}
                handleChange={(file) =>
                  filehandleChangeUserImages(file, "Users")
                }
                name="file"
                children={fileuploadDesign}
              />
            </div>
            <div className={TutorClasses.image_array}>
              {images.length > 0
                ? images.map((item, index) => (
                    <div key={index} className={TutorClasses.image_container}>
                      <img
                        key={index}
                        src={item}
                        alt="Image Preview"
                        className={TutorClasses.image_uploader}
                        onClick={() => {
                          window.open(item, "_blank");
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(item)}
                        className={TutorClasses["imageremover"]}
                      >
                        <FaTimes size={24} />
                      </button>
                    </div>
                  ))
                : userImages.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt="Previous Product Image"
                      className={TutorClasses.image_uploader}
                    />
                  ))}
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

export default AddUser;
