import { useLocation } from "react-router";
import MainForecast from "./MainForecast/MainForecast";
import SearchCity from "./Search/SearchCity";
import TopBar from "../Header/TopBar";

function HomePage() {
  const location: any = useLocation();
  const cityFromUrl = location.state;
  return (
    <>
      <TopBar />
      <SearchCity cityFromUrl={cityFromUrl} />
      <MainForecast />
    </>
  );
}
export default HomePage;
