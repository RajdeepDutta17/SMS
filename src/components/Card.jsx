import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Card = ({ icon, heading, path }) => {
  const navigate = useNavigate();
  const handleClick = (dest) => {
    navigate(dest);
  };
  return (
    <div
      className="card p-5 border border-warning"
      style={{ cursor: "pointer" }}
      onClick={() => handleClick(path)}
    >
      <div className="text-center mt-2 fs-1">
        <i className={icon}></i>
      </div>
      <div className="card-body fs-5 ">
        <p className="card-text text-center">{heading}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Card;
