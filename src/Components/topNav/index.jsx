import topnavclasses from "./topNav.module.css";
import User from "../../Assets/user.svg";
import { HiOutlineLogout } from "react-icons/hi";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import useStore from "store";
function TopNav() {
    const Navigate = useNavigate();
    const userdata = JSON.parse(localStorage.getItem("admindata"));
    const { userData } = useStore();

    const logoutHandler = () => {
        swal("Are You sure you want to Sign out?", {
            icon: "warning",
            className: topnavclasses["logout-popup"],
            dangerMode: true,
            buttons: {
                cancel: "Cancel",
                catch: {
                    text: "Logout",
                    value: "Logout",
                    className: topnavclasses["cancel"],
                },
                defeat: false,
            },
        }).then((value) => {
            switch (value) {
                case "Logout":
                    Navigate("/");
                    localStorage.clear();
                    break;

                default:
                // swal("Got away safely!");
            }
        });
    };
    return (
        <div className={topnavclasses["TopNav"]}>
            <h1 style={{ color: "white" }}></h1>
            <div className={topnavclasses.profile_section}>
                {/* <div className={topnavclasses["search-bar"]}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={topnavclasses["search-input"]}
                    />
                    <button className={topnavclasses["s-button"]}>
                        <FaSearch />
                    </button>
                </div> */}
                <div className={topnavclasses["user"]}>
                    <img src={User} alt="Avatar" />
                    <span className="user-name">{`${userdata.FirstName} ${userdata.LastName}`}</span>
                </div>

                <button onClick={logoutHandler} className={topnavclasses.logout}>
                    <HiOutlineLogout size={25} id="Logout" />
                </button>

            </div>
        </div>
    );
}

export default TopNav;
