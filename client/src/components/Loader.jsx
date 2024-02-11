import { tailspin } from 'ldrs'

const Loader = ({ className }) => {


  tailspin.register();


  return (
    // Default values shown
    <div
      className={` flex h-screen w-full items-center justify-center ${className}`}
    >
      <l-tailspin
  size="40"
  stroke="3.5"
  speed="1" 
  color="black" 
></l-tailspin>
    </div>
  );
};

export default Loader;
