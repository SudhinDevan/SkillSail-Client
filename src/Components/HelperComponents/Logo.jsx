import PropTypes from "prop-types";

const Logo = ({ className, onClick }) => {
  return (
    <div className={`w-40 ${className}`} onClick={onClick}>
      <img src="/skillSail.png" alt="logo" />
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Logo;
