import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex flex-wrap items-center justify-start gap-2">
      <div>
        {step1 ? (
          <Link to="/checkout/information" className="text-xs font-bold">
            INFORMATION
          </Link>
        ) : (
          <button disabled className="text-xs font-medium text-[#808080]">
            Sign in
          </button>
        )}
      </div>

      <div>
        {step2 ? (
          <Link to="/checkout/shipping" className="text-xs font-bold">
            SHIPPING
          </Link>
        ) : (
          <button disabled className="text-xs font-medium text-[#808080]">
            SHIPPING
          </button>
        )}
      </div>

      <div>
        {step3 ? (
          <Link to="/checkout/payment" className="text-xs font-bold">
            PAYMENT
          </Link>
        ) : (
          <button disabled className="text-xs font-medium text-[#808080]">
            PAYMENT
          </button>
        )}
      </div>

      <div>
        {step4 ? (
          <Link to="/checkout/placeorder" className="text-xs font-bold">
            PLACE ORDER
          </Link>
        ) : (
          <button disabled className="text-xs font-medium text-[#808080]">
            PLACE ORDER
          </button>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
