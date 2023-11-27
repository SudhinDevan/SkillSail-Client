import { useSelector } from "react-redux";
import { useState } from "react";
import AxiosInstance from "../../Axios/AxiosInstance";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/userSlice";
import toast, { Toaster } from "react-hot-toast";

const UserProfileForm = () => {
  const { name, email, phone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: email,
  });
  // const [image, setImage] = useState(null);

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
    const res = await AxiosInstance.post("/editProfile", inputs).catch(
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
          console.log(res);
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

  // const displayImageSet = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onloadend = () => {
  //     // console.log('imageData');
  //     const imageData = reader.result;
  //     // console.log(imageData);
  //     setImage(imageData);
  //     // imageUploader();
  //   };

  //   // if (e.type === "loadend") {
  //   //   const imageData = reader.result;
  //   //   setImage(imageData);
  //   //   imageUploader();
  //   // }
  //   console.log('sdfjdf',image);
  //   // imageUploader();
  // };

  // useEffect(()=>{
  //   imageUploader();
  // },[image])

  // const imageUploader = async () => {
  //   console.log("image: ", image);
  //   try {
  //     const res = await AxiosInstance.post(
  //       "/profile/displayimage",
  //       { image }
  //     );
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
      <body className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
        <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://source.unsplash.com/MP0IUfwrn0A')",
                }}
              >
                <img
                  className="bg-transparent w-10 pt-2 pr-2"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADaElEQVR4nO2bTU8TQRyHG6M3v4DfwKMJR4lN3Ckvs0WkswsYFA+iF00IiVKNhYpVEY0KRCC8aFwiypsR5ODBRAzEg1Ex3AxIAJHEg8gBoZQ2/ZtprLal3Wy3LTtb55fMaV+fZ2ZnZ2d3LRYeHp54QXbZKojSgIDJsoBJAIkS7HwhWwiTJkuScbvduw4XyjYkSncFLL1AWBpHmAwhkTjz7I79qhvn5JzZg0TSaQzw9lJwpNwHAE6tZXhkrFuqqPquss8grdj8/JJ98WueJfjicuh59Bi0ZvDZKOQVlWraN23ZNiwf2NbsI1eq9zTBzOwc+P1+YD1K34Aeya+iBAiiNBhe6Gq4CWaJTnjax7RFC8BkObyQ1nxWw2MyaZXlvbEC/vb2Wdzs48PTRK6UvfDSRFx4MwnQC1956uxiQnizCNALX1NbByurqzcsakGMC0gFfsPrpbu4YloBSurw5hWgpAfenAIUvfDO+lh48wlQ0gtvLgFK+uHNI0BJAd7r3VTbNfsClMzBsy9AySw82wIUnfBO11XY9NFJIzCvgP7hkYzDdz3shYLiMvU5RmSQgNITpzNd86HpNbqdgImPOQGdD3qThPckBU8TuT1zAoLBILR29GQMnjkBHz9NQ2t7N8wvfo2S0Hy/UxX+Yt018Pm2dB2TGQE/Vn4CLjkWOsbR0pPweWY2SsL1pntph2dKgBJzu4uVQFtHuuGZEeD3B6AsTo9PJXyYmg4NZhpvt0Qtu1SfOjwzAsYn3ibd26cDnhkBNbV1hsAzIWBhcQlsdtkQeCYEtLR1aYJP1zXPlID19Q0oIsdVwasvuOD1m0kIBAKQiRgqYHTsZVxo0VEBd1o74MvcPGQ6hgpojhnhVVadg6HnY7C29gt2KoYKmJtfgOrzl8HtuQXv3k+FRnw7HcM7QaPDBYi8BQC/BETeBwDvBEV+FwB+G0wUxMcBEh8IIT4SlPhQGPFnAQmyLfxZQNTwLCCY7GNpraEsYS7KqCZg2Wyfy2sJffMU0QKWEg+EMOkPr+hqaIRsCZ2J+ieA9CUUYMOOQ5HXCv1rhNoz4+VAz5meO63IqMlYu5ybUACNgKUOrW9vzFdifpFJ+NscJu3ZCG+1WndbtAbZ5VyEyVOEyTfjfpzUX/6c85IgSk9shY6DmsF5eCz/VX4DU5He/Lw8sL8AAAAASUVORK5CYII="
                />
              </div>
              <h1 className="text-3xl font-bold pt-8 lg:pt-0 p-3 border-b-2">
                {name}
              </h1>
              <h4 className="font-bold pt-8 lg:pt-0 text-base py-3 mt-5">
                Email: <span>{email}</span>
              </h4>
              <h4 className="font-bold text-base py-3">
                Phone: <span>{phone}</span>
              </h4>
              <button
                className="bg-white hover:bg-orange-200 hover:text-blue-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-3"
                type="button"
                onClick={toggleModal}
              >
                Edit Profile
              </button>

              <button className="bg-white p-4 hover:bg-orange-200 hover:text-blue-900 font-semibold py-2 border border-gray-400 rounded shadow mt-3 mx-20">
                Change Password
              </button>
            </div>
          </div>
          <div className="w-full lg:w-2/5 h-2/3">
            <div
              className="hidden sm:block md:w-full h-full shadow-xl bg-cover bg-center rounded-md md:flex md:flex-col md:items-end"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/MP0IUfwrn0A')",
              }}
            >
              <div>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  // onChange={(e) => displayImageSet(e)}
                  className="hidden"
                  id="imageInput"
                />
                <label htmlFor="imageInput" className="cursor-pointer">
                  <img
                    className="w-10 pt-2 pr-2 hover:transform hover:-translate-y-1 hover:duration-300"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADaElEQVR4nO2bTU8TQRyHG6M3v4DfwKMJR4lN3Ckvs0WkswsYFA+iF00IiVKNhYpVEY0KRCC8aFwiypsR5ODBRAzEg1Ex3AxIAJHEg8gBoZQ2/ZtprLal3Wy3LTtb55fMaV+fZ2ZnZ2d3LRYeHp54QXbZKojSgIDJsoBJAIkS7HwhWwiTJkuScbvduw4XyjYkSncFLL1AWBpHmAwhkTjz7I79qhvn5JzZg0TSaQzw9lJwpNwHAE6tZXhkrFuqqPquss8grdj8/JJ98WueJfjicuh59Bi0ZvDZKOQVlWraN23ZNiwf2NbsI1eq9zTBzOwc+P1+YD1K34Aeya+iBAiiNBhe6Gq4CWaJTnjax7RFC8BkObyQ1nxWw2MyaZXlvbEC/vb2Wdzs48PTRK6UvfDSRFx4MwnQC1956uxiQnizCNALX1NbByurqzcsakGMC0gFfsPrpbu4YloBSurw5hWgpAfenAIUvfDO+lh48wlQ0gtvLgFK+uHNI0BJAd7r3VTbNfsClMzBsy9AySw82wIUnfBO11XY9NFJIzCvgP7hkYzDdz3shYLiMvU5RmSQgNITpzNd86HpNbqdgImPOQGdD3qThPckBU8TuT1zAoLBILR29GQMnjkBHz9NQ2t7N8wvfo2S0Hy/UxX+Yt018Pm2dB2TGQE/Vn4CLjkWOsbR0pPweWY2SsL1pntph2dKgBJzu4uVQFtHuuGZEeD3B6AsTo9PJXyYmg4NZhpvt0Qtu1SfOjwzAsYn3ibd26cDnhkBNbV1hsAzIWBhcQlsdtkQeCYEtLR1aYJP1zXPlID19Q0oIsdVwasvuOD1m0kIBAKQiRgqYHTsZVxo0VEBd1o74MvcPGQ6hgpojhnhVVadg6HnY7C29gt2KoYKmJtfgOrzl8HtuQXv3k+FRnw7HcM7QaPDBYi8BQC/BETeBwDvBEV+FwB+G0wUxMcBEh8IIT4SlPhQGPFnAQmyLfxZQNTwLCCY7GNpraEsYS7KqCZg2Wyfy2sJffMU0QKWEg+EMOkPr+hqaIRsCZ2J+ieA9CUUYMOOQ5HXCv1rhNoz4+VAz5meO63IqMlYu5ybUACNgKUOrW9vzFdifpFJ+NscJu3ZCG+1WndbtAbZ5VyEyVOEyTfjfpzUX/6c85IgSk9shY6DmsF5eCz/VX4DU5He/Lw8sL8AAAAASUVORK5CYII="
                    alt="Upload Image"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {isModalVisible && (
          <div
            aria-hidden="true"
            className="flex   fixed  z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
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
      </body>
      <Toaster />
    </>
  );
};

export default UserProfileForm;
