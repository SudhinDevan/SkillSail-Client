import { useSelector } from "react-redux";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";
import AxiosInstance from "../../Axios/AxiosInstance";
import ProfileIcon from "../HelperComponents/ProfileIcon";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { IoCameraReverse } from "react-icons/io5";

const profilePic =
  "https://akademi.dexignlab.com/react/demo/static/media/8.0ec0e6b47b83af64e0c9.jpg";

const UserProfileForm = () => {
  const { name, email, phone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: email,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/user/profileDetails", {
          params: { email },
        });
        setImage(response.data.user.profilePic.url);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [image, email]);

  const handleMouse = () => {
    setIsHovered((prev) => !prev);
  };

  const handleImage = (e) => {
    ImageToBase(e.target.files[0]);
  };

  const ImageToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      changeImage(reader.result);
    };
    reader.onerror = (error) => {
      toast.error("Error reading file: ", error.message);
    };
  };

  const changeImage = async (file) => {
    let toastId;
    toastId = toast.loading("Loading...");
    const response = await AxiosInstance.put("/user/editImage", {
      file,
      email,
    });
    if (response.status === 200) {
      let imageUrl = response.data.user.profilePic.url;
      setImage(imageUrl);
      toast.remove(toastId);
      toast.success("Display Picture updated successfully");
    } else {
      toast.error("Unexpected error Occured");
    }
  };

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handlechange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await AxiosInstance.post("/user/editProfile", inputs).catch(
      (error) => console.log(error.message)
    );

    const data = await res.data;
    return { ...data, status: res.status };
  };

  const handleSubmit = (e) => {
    if (inputs.name === "" && inputs.phone === "") {
      e.preventDefault();
      toast.error("No changes submitted !");
      toggleModal();
    } else {
      e.preventDefault();
      sendRequest().then((res) => {
        if (res.status === 200) {
          const { name, phone, email, _id, role } = res.updatedUser;
          dispatch(
            userLogin({
              name,
              phone,
              email,
              id: _id,
              role,
            })
          );
          toast.success("Successfully Updated");
          toggleModal();
        }
      });
    }
  };

  return (
    <div className="w-screen h-screen+50 md:h-screen overflow-x-hidden">
      <div className="w-full h-full bg-gray-300 py-5 px-10 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4 h-full flex flex-col gap-4">
          <div className="h-1/2 flex flex-col relative">
            <div className="bg-profile-card-color h-1/3 rounded-tl-md rounded-tr-md"></div>
            <div className="bg-white h-2/3 rounded-bl-md rounded-br-md">
              <div className="h-1/4 p-2 flex justify-end pr-5">
                <button
                  onClick={toggleModal}
                  className="border-2 p-3 flex justify-center items-center font-semibold text-gray-500 hover:text-orange-400 rounded-md hover:bg-profile-card-color duration-500 hover:translate-x-1 transition-all border-gray-300"
                >
                  Edit Details
                </button>
              </div>
              <div className="h-1/4 pl-5 text-2xl font-semibold flex items-center">
                {name}
              </div>
              <div className="h-2/4 flex flex-col md:flex-row pl-5">
                <div className="w-1/2 h-full flex items-center">
                  <ProfileIcon
                    Icon={<FaMailBulk />}
                    title="email"
                    subtitle={email}
                  />
                </div>
                <div className="w-1/2 h-full flex items-center">
                  <ProfileIcon
                    Icon={<FaPhone />}
                    title="phone"
                    subtitle={phone}
                  />
                </div>
              </div>
            </div>
            <div
              className="bg-white w-24 md:w-28 h-24 md:h-28 rounded-full absolute top-14 md:top-8 left-4 flex items-center justify-center"
              onMouseEnter={handleMouse}
              onMouseLeave={handleMouse}
            >
              <label htmlFor="fileInput" className="cursor-pointer">
                <div
                  style={{
                    backgroundImage: `url(${image ? image : profilePic})`,
                  }}
                  className={`bg-black bg-cover bg-center w-20 md:w-24 h-20 md:h-24 flex transition-all duration-200 flex-col justify-center text-center rounded-full ${
                    isHovered && "hover:opacity-70"
                  }`}
                >
                  {isHovered && !inputs.image && (
                    <div className="text-white text-center justify-center flex">
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        className="hidden"
                        name="image"
                        onChange={(e) => handleImage(e)}
                      />
                      <label htmlFor="fileInput">
                        <IoCameraReverse className="text-3xl cursor-pointer" />
                      </label>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
          <div className="bg-white h-1/2 rounded-md">
            <div className="h-2/3 flex flex-col justify-center gap-2 pl-5">
              <div className="font-bold text-2xl">Purchased Courses:</div>
              <div className="text-sm w-3/4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>
        <div className="bg-grey-500 w-full md:w-1/4 h-1/2 flex flex-col gap-2">
          <div className="bg-white rounded-md h-1/4 flex flex-col justify-center pl-5">
            <div className="text-sm font-semibold capitalize">
              Recent uploads
            </div>
            <div className="text-verySmall">Thursday, 10th April , 2022</div>
          </div>
          <div className="bg-white rounded-md h-2/4">
            <div className="h-1/2 flex flex-col justify-center pl-5">
              <div className="text-sm font-medium">Osint</div>
              <div className="text-verySmall-1">Lessons: 14</div>
            </div>
            <div className="h-1/2 flex">
              <div className="w-2/3 flex flex-col justify-center pl-5">
                <div className="text-verySmall-1">July 20, 2023</div>
                <div className="text-verySmall-1">Students : 3</div>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                <div
                  style={{
                    backgroundImage: `url(${image ? image : profilePic})`,
                  }}
                  className="w-12 h-12 bg-center bg-cover rounded-full"
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-profile-card-color bg-opacity-10 hover:bg-opacity-100 rounded-3xl h-1/6 flex justify-center items-center text-sm text-profile-color hover:text-white cursor-pointer">
            View More
          </div>
        </div>
        {isModalVisible && (
          <div
            aria-hidden="true"
            className="flex fixed z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
          >
            <div className="relative  w-full  max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Profile
                  </h3>

                  <button
                    onClick={toggleModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handlechange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder={name}
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={handlechange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder={phone}
                        required=""
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 hover:text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default UserProfileForm;
