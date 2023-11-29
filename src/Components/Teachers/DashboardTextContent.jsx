import PropTypes from "prop-types";

const DashboardTextContent = ({ text }) => {
  return (
    <div className="h-1/5 md:h-1/4 flex flex-col justify-center">
      <div className="capitalize text-black text-lg md:text-2xl font-semibold">
        hello {text}
      </div>
      <div className="capitalize text-orange-500 text-lg md:text-2xl font-medium">
        Welcome to Dashboard
      </div>
      <div className="capitalize text-black text-lg md:text-2xl font-semibold">
        Congratulation ,You Have Some Good News
      </div>
    </div>
  );
};

DashboardTextContent.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DashboardTextContent;
