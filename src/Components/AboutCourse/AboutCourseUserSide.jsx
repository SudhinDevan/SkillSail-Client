const AboutCourseUserSide = ({ courseId }) => {
  return (
    <>
      {courseDetails && (
        <div className="p-3">
          <div className="flex justify-between">
            <span className="text-2xl font-bold">
              {courseDetails.courseName}
              {` `}:
            </span>
            <div className="absolute top-32 right-3">
              {/* //////////////////// */}
              {chapterDetails.map((chapter) => (
                <div className="relative py-3" key={chapter._id}>
                  <button
                    id="dropdownDefaultButton"
                    className="text-gray-600 bg-gray-300 hover:text-gray-600 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-xl w-96 overflow-hidden px-2 py-2.5 text-center inline-flex items-center justify-center"
                    type="button"
                  >
                    {chapter.chapterName}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-3 p-5">
            <img
              src={courseDetails.thumbnail.url}
              alt="thumbnail"
              className="w-1/4"
            />
          </div>
          <div className="p-3 mx-5 w-2/3">
            <span className="text-xl">
              <span className="font-bold">Course Blurb:{` `}</span>
              {courseDetails.blurb}
            </span>
          </div>

          <div className="p-3 mx-5 w-2/3">
            <span className="font-bold text-lg">Description:{` `} </span>
            <div className="text-justify">{courseDetails.description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutCourseUserSide;
