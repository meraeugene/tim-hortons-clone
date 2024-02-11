import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex  flex-wrap items-center justify-start">
      <span>
        {value >= 1 ? (
          <FaStar
            color="#FFD700
          "
          />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt
            color="#FFD700
          "
          />
        ) : (
          <FaRegStar
            color="#FFD700
          "
          />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar
            color="#FFD700
          "
          />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt
            color="#FFD700
          "
          />
        ) : (
          <FaRegStar
            color="#FFD700
          "
          />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar
            color="#FFD700
          "
          />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt
            color="#FFD700
          "
          />
        ) : (
          <FaRegStar
            color="#FFD700
          "
          />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar
            color="#FFD700
          "
          />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt
            color="#FFD700
          "
          />
        ) : (
          <FaRegStar
            color="#FFD700
          "
          />
        )}
      </span>
      <span className="mr-4">
        {value >= 5 ? (
          <FaStar
            color="#FFD700
          "
          />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt
            color="#FFD700
          "
          />
        ) : (
          <FaRegStar
            color="#FFD700
          "
          />
        )}
      </span>
      <span className=" text-gray-600">{text && text}</span>
    </div>
  );
};

export default Rating;
