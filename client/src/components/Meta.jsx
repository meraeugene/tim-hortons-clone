import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to  Tim Hortons Shop",
  description: "Always Fesh Coffee & Baked Goods",
  keywords:
    "coffee,retail packs,breakfast,wedges and dips,lunch and sandwiches, donuts and timbits, baked goods",
};

export default Meta;
