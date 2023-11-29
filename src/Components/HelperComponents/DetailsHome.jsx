import PropTypes from "prop-types";

const DetailsHome = (props) => {
  const { name, color } = props;

  return (
    <>
      <div className={`p-4 border rounded shadow-sm ${color}`}>
        <p className="mb-3 text-2xl font-semibold tracking-wide uppercase">
          {name}
        </p>
        <p className="mb-5 text-gray-700 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          consectetur quod reiciendis, in facilis soluta temporibus deserunt non
          odit! Tempore id minus veritat soluta temporibus deserunt non odit in
          facilis soluta temporibus
        </p>
      </div>
    </>
  );
};

DetailsHome.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default DetailsHome;
