import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import SyncLoader from "react-spinners/SyncLoader";

const ChapterDetailsComp = ({ chapterId }) => {
  const AxiosInstance = UseAxiosPrivate();
  const [chapterDetails, setChapterDetails] = useState(null);

  useEffect(() => {
    const chapterFetch = async () => {
      try {
        const response = await AxiosInstance.get("/tutor/chapterDetails", {
          params: { chapterId },
        });
        setChapterDetails(response.data.chapterDetails);
      } catch (error) {
        console.error("error fetching chapter details", error);
      }
    };

    chapterFetch();
  }, []);

  return (
    <>
      {chapterDetails ? (
        <div className="flex justify-center pb-10 items-center flex-col pt-10">
          <h1 className="text-2xl font-semibold text-gray-500 pb-5">
            {chapterDetails.chapterName}
          </h1>
          <video width="720" height="480" controls>
            <source src={chapterDetails.video.url} type="video/mp4" />
            <h1>Your browser does not support the video tag.</h1>
          </video>
          <div className="pt-5 w-2/3">
            <span className="font-bold text-lg pt-3">Description:{` `} </span>
            <div className="text-justify pt-3">
              {chapterDetails.description}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader
            color="#004787" // Dark blue color
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

ChapterDetailsComp.propTypes = {
  chapterId: PropTypes.string.isRequired,
};

export default ChapterDetailsComp;
