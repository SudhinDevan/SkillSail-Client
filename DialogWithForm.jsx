import { useSelector } from "react-redux";

const Profile = () => {
  const { name } = useSelector((state) => state.user);

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
                Email: <span>{name}</span>
              </h4>
              <h4 className="font-bold text-base py-3">
                Phone: <span>8898009087</span>
              </h4>
              <button className="bg-white hover:bg-orange-200 hover:text-blue-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-3">
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
              <img
                className="w-10 pt-2 pr-2"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADaElEQVR4nO2bTU8TQRyHG6M3v4DfwKMJR4lN3Ckvs0WkswsYFA+iF00IiVKNhYpVEY0KRCC8aFwiypsR5ODBRAzEg1Ex3AxIAJHEg8gBoZQ2/ZtprLal3Wy3LTtb55fMaV+fZ2ZnZ2d3LRYeHp54QXbZKojSgIDJsoBJAIkS7HwhWwiTJkuScbvduw4XyjYkSncFLL1AWBpHmAwhkTjz7I79qhvn5JzZg0TSaQzw9lJwpNwHAE6tZXhkrFuqqPquss8grdj8/JJ98WueJfjicuh59Bi0ZvDZKOQVlWraN23ZNiwf2NbsI1eq9zTBzOwc+P1+YD1K34Aeya+iBAiiNBhe6Gq4CWaJTnjax7RFC8BkObyQ1nxWw2MyaZXlvbEC/vb2Wdzs48PTRK6UvfDSRFx4MwnQC1956uxiQnizCNALX1NbByurqzcsakGMC0gFfsPrpbu4YloBSurw5hWgpAfenAIUvfDO+lh48wlQ0gtvLgFK+uHNI0BJAd7r3VTbNfsClMzBsy9AySw82wIUnfBO11XY9NFJIzCvgP7hkYzDdz3shYLiMvU5RmSQgNITpzNd86HpNbqdgImPOQGdD3qThPckBU8TuT1zAoLBILR29GQMnjkBHz9NQ2t7N8wvfo2S0Hy/UxX+Yt018Pm2dB2TGQE/Vn4CLjkWOsbR0pPweWY2SsL1pntph2dKgBJzu4uVQFtHuuGZEeD3B6AsTo9PJXyYmg4NZhpvt0Qtu1SfOjwzAsYn3ibd26cDnhkBNbV1hsAzIWBhcQlsdtkQeCYEtLR1aYJP1zXPlID19Q0oIsdVwasvuOD1m0kIBAKQiRgqYHTsZVxo0VEBd1o74MvcPGQ6hgpojhnhVVadg6HnY7C29gt2KoYKmJtfgOrzl8HtuQXv3k+FRnw7HcM7QaPDBYi8BQC/BETeBwDvBEV+FwB+G0wUxMcBEh8IIT4SlPhQGPFnAQmyLfxZQNTwLCCY7GNpraEsYS7KqCZg2Wyfy2sJffMU0QKWEg+EMOkPr+hqaIRsCZ2J+ieA9CUUYMOOQ5HXCv1rhNoz4+VAz5meO63IqMlYu5ybUACNgKUOrW9vzFdifpFJ+NscJu3ZCG+1WndbtAbZ5VyEyVOEyTfjfpzUX/6c85IgSk9shY6DmsF5eCz/VX4DU5He/Lw8sL8AAAAASUVORK5CYII="
              />
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Profile;
