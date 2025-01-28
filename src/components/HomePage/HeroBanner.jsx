import { Link } from 'react-router-dom';
import heroImage from "../../assets/images/heroImage.png";
import Button from "../global/Button";
import HappyUsers from "../../assets/images/HappyUsers.png";

const heading = "Expert Medical care is just a Click away";
const paragraph = "Book your appointment today with our experienced doctors. Get the care you need and start feeling better.";
const button1 = "Book Your Visit";
const button2 = "Get Mobile App";

const HeroBanner = () => {
  return (
    <>
      <div className="max-w-[1120px] mx-auto w-full gap-8 flex justify-between mt-20 items-center">
        <div className="flex flex-col justify-center gap-12 w-[544px]">
          <div>
            <h1 className="text-[56px] leading-[64px] font-extrabold font-poppins">{heading}</h1>
            <p className="text-[#999999]">{paragraph}</p>
          </div>
          <div className="flex gap-6">
            <Link to="/login">
              <Button className="px-8 py-4 bg-[#1061E5] text-white">{button1}</Button>
            </Link>
            <Link to="/signup">
              <Button className="px-8 py-4 bg-white text-[#1061E5] shadow">{button2}</Button>
            </Link>
          </div>
          <div>
            <img src={HappyUsers} alt="" />
          </div>
        </div>
        <div>
          <img src={heroImage} alt="" className="w-[544px] h-[732px]" />
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
