import { Link } from 'react-router-dom';
import heroImage from "../../assets/images/heroImage.png";
import Button from "../common/Button";
import HappyUsers from "../../assets/images/HappyUsers.png";

const heading = "Expert Medical care is just a Click away";
const paragraph = "Book your appointment today with our experienced doctors. Get the care you need and start feeling better.";
const button1 = "Book Your Visit";
const button2 = "Get Mobile App";

const HeroBanner = () => {
  return (
    <>
      <div className="max-w-[1120px] px-6 mx-auto w-full gap-8 py-20 flex flex-col-reverse lg:flex-row justify-between lg:mt-20  items-center">
        <div className="flex flex-col justify-center gap-12 w-full lg:w-[544px]">
          <div>
            <h1 className="lg:text-[56px] text-[24px] text-center lg:text-left lg:leading-[64px] font-extrabold font-poppins">{heading}</h1>
            <p className="text-[#999999] text-center lg:text-left">{paragraph}</p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-center lg:justify-normal gap-6">
            <Link to="/login">
              <Button className="px-8 w-full lg:w-auto py-4 bg-[#1061E5] text-white">{button1}</Button>
            </Link>
            <Link to="/signup">
              <Button className="px-8 py-4 w-full lg:w-auto bg-white text-[#1061E5] shadow">{button2}</Button>
            </Link>
          </div>
          <div>
            <img src={HappyUsers} alt="" className="w-full h-full px-6"/>
          </div>
        </div>
        <div>
          <img src={heroImage} alt="" className="lg:w-[544px]  lg:h-[732px]" />
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
