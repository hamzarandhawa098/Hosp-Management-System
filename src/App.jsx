import { BrowserRouter } from "react-router-dom";
import  Routes  from "../src/routes/routes";
export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    </>
  );
}
