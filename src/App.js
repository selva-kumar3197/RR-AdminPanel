import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Main from "./pages/dashboard/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import CareerList from "./pages/Career/CareerList";
import AddCareer from "./pages/Career/AddCareer";
import JobApplyList from "./pages/Career/JobApplyList";
import PrNewsList from "./pages/Blogs/PrNewsList";
import PropertiesList from "./pages/Properties/PropertiesList";
import PropertiesAdd from "./pages/Properties/PropertiesAdd";
import CSRList from "./pages/CSR/CSRList";
import CSRAdd from "./pages/CSR/CSRAdd";
import AddNews from "./pages/News/AddNews";
import NewsList from "./pages/News/NewsList";
import BannerList from "./pages/Banner/BannerList";
import AddBanner from "./pages/Banner/AddBanner";
import AddAwards from "./pages/Awards/AddAwards";
import AwardList from "./pages/Awards/AwardList";
import Awards from "./pages/Awards/Awards";
import PrivacyList from "./pages/privacy/PrivacyList";
import ServicesList from "./pages/services/ServicesList";
import ServiceAdd from "./pages/services/ServiceAdd";
import LeadershipList from "./pages/leadership/LeadershipList";
import LeadershipAdd from "./pages/leadership/LeadershipAdd";
import InsightList from "./pages/Insights/InsightList";
import InsightAdd from "./pages/Insights/InsightAdd";
import ExecutivesList from "./pages/Executives/ExecutivesList";
import ExecutivesAdd from "./pages/Executives/ExecutivesAdd";
import CaseStudyList from "./pages/casestudy/CaseStudyList";
import CaseStudyAdd from "./pages/casestudy/CaseStudyAdd";
import PropertyExpert from "./pages/propertyExperts/PropertyExperts";
import UserList from "./pages/User/UserList";

import PrivateRoute from "./privateRoute";
import { Fragment } from "react";
import PrNews from "./pages/Blogs/PrNews";
import MarketTrendsList from "./pages/marketTrends/MarketTrendsList";
import MarketTrends from "./pages/marketTrends/MarketTrends";
import ListRequirement from "./pages/List Requirement/ListRequirement";
import Contactus from "./pages/Contactus";
import FeedbackForm from "./pages/Feedback";

import Property_enquiry from "./pages/Properties/Property_enquiry";
import AddCorporateTeam from "./pages/CorporateTeam/AddCoporateTeam";
import CorporateTeamList from "./pages/CorporateTeam/CorporateTeamList";
import RetailAddTeam from "./pages/RetailtTeam/RetailAddTeam";
import RetailTeamList from "./pages/RetailtTeam/RetailTeamList";
import WerehouseAddTeam from "./pages/warehouseTeam/WerehouseAddTeam";
import AddinvestmentTeam from "./pages/InvestmentTeam/AddInvestmentTeam";
import InvestmentTeamList from "./pages/InvestmentTeam/InvestmentTeamList";
import AddInteriorTeam from "./pages/InteriorTeam/AddInteriorTeam";
import WerehouseTeamList from "./pages/warehouseTeam/WerehouseTeamList";
import InteriorTeamList from "./pages/InteriorTeam/ListInteriorTeam";
import AddLiferr from "./pages/Life@RR/AddLife@rr";
import ListLiferr from "./pages/Life@RR/ListLife@rr";
import AddTeamRR from "./pages/Team@RR/AddTeam@RR";
import ListTeamRR from "./pages/Team@RR/ListTeam@RR";
import CreateCategoryTeam from "./pages/Team@RR/CreateCategoryTeam";
import AddCorporateGallery from "./pages/CorporateTeam/AddCorporateGallery";
import CorporateGalleryList from "./pages/CorporateTeam/CorporateGalleryList";
import AddRetailGallery from "./pages/RetailtTeam/AddRetailGallery";
import RetailGalleryList from "./pages/RetailtTeam/RetailGalleryList";
import AddWerehouseGallery from "./pages/warehouseTeam/AddWerehouseGallery";
import WerehouseGalleryList from "./pages/warehouseTeam/WerehouseGalleryList";
import AddInvestmentGallery from "./pages/InvestmentTeam/AddInvestmentGallery";
import InvestmentGalleryList from "./pages/InvestmentTeam/InvestmentGalleryList";
import InteriorGalleryList from "./pages/InteriorTeam/InteriorGalleryList";
import AddInteriorGallery from "./pages/InteriorTeam/AddInteriorGallery";
import CSR from "./pages/CSR/CSR";
import Feedback from "react-bootstrap/esm/Feedback";
// import Assign from "./pages/Category/Assign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {" "}
              <Main />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/career-add"
          element={
            <PrivateRoute>
              {" "}
              <AddCareer />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog-list"
          element={
            <PrivateRoute>
              <PrNewsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/markettrend-list"
          element={
            <PrivateRoute>
              <MarketTrendsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/markettrend"
          element={
            <PrivateRoute>
              <MarketTrends />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog-add"
          element={
            <PrivateRoute>
              <PrNews />
            </PrivateRoute>
          }
        />
        <Route
          path="/properties-list"
          element={
            <PrivateRoute>
              <PropertiesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/csr-list"
          element={
            <PrivateRoute>
              <CSRList />
            </PrivateRoute>
          }
        />
            <Route
          path="/CSR"
          element={
            <PrivateRoute>
              <CSR/>
            </PrivateRoute>
          }
        />
        <Route
          path="/properties-add"
          element={
            <PrivateRoute>
              <PropertiesAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/csr-add"
          element={
            <PrivateRoute>
              <CSRAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/news-add"
          element={
            <PrivateRoute>
              <AddNews />
            </PrivateRoute>
          }
        />
        <Route
          path="/news-list"
          element={
            <PrivateRoute>
              <NewsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/banner_img_list"
          element={
            <PrivateRoute>
              <BannerList />
            </PrivateRoute>
          }
        />
        <Route
          path="/banner-add"
          element={
            <PrivateRoute>
              <AddBanner />
            </PrivateRoute>
          }
        />
        <Route
          path="/awards"
          element={
            <PrivateRoute>
              <Awards />
            </PrivateRoute>
          }
        />
        <Route
          path="/award-add"
          element={
            <PrivateRoute>
              <AddAwards />
            </PrivateRoute>
          }
        />
        <Route
          path="/award-list"
          element={
            <PrivateRoute>
              <AwardList />
            </PrivateRoute>
          }
        />
        <Route
          path="/career-list"
          element={
            <PrivateRoute>
              <CareerList />
            </PrivateRoute>
          }
        />
        <Route
          path="/JobApplyList"
          element={
            <PrivateRoute>
              <JobApplyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/privay_list"
          element={
            <PrivateRoute>
              <PrivacyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/services-list"
          element={
            <PrivateRoute>
              <ServicesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/services-add"
          element={
            <PrivateRoute>
              <ServiceAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/leadership-list"
          element={
            <PrivateRoute>
              <LeadershipList />
            </PrivateRoute>
          }
        />
        <Route
          path="/leadership-add"
          element={
            <PrivateRoute>
              <LeadershipAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/insights-list"
          element={
            <PrivateRoute>
              <InsightList />
            </PrivateRoute>
          }
        />
        <Route
          path="/insight-add"
          element={
            <PrivateRoute>
              <InsightAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/executives-list"
          element={
            <PrivateRoute>
              <ExecutivesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/executives-add"
          element={
            <PrivateRoute>
              <ExecutivesAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/casestudy-list"
          element={
            <PrivateRoute>
              <CaseStudyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/casestudy-add"
          element={
            <PrivateRoute>
              <CaseStudyAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/propertyexpert-list"
          element={
            <PrivateRoute>
              <PropertyExpert />
            </PrivateRoute>
          }
        />
        <Route
          path="/user_list"
          element={
            <PrivateRoute>
              <UserList />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/ListRequirement"
          element={
            <PrivateRoute>
              <ListRequirement />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/Contactus"
          element={
            <PrivateRoute>
              <Contactus />{" "}
            </PrivateRoute>
          }
        />
         <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <FeedbackForm />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/Property_enquiry"
          element={
            <PrivateRoute>
              <Property_enquiry />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/AddCorporateTeam"
          element={
            <PrivateRoute>
              <AddCorporateTeam />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/CorporateTeamList"
          element={
            <PrivateRoute>
              <CorporateTeamList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/RetailAddTeam"
          element={
            <PrivateRoute>
              <RetailAddTeam />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/RetailTeamList"
          element={
            <PrivateRoute>
              <RetailTeamList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/WerehouseAddTeam"
          element={
            <PrivateRoute>
              <WerehouseAddTeam />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/WerehouseTeamList"
          element={
            <PrivateRoute>
              <WerehouseTeamList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/AddinvestmentTeam"
          element={
            <PrivateRoute>
              <AddinvestmentTeam />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/InvestmentTeamList"
          element={
            <PrivateRoute>
              <InvestmentTeamList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/AddInteriorTeam"
          element={
            <PrivateRoute>
              <AddInteriorTeam />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/InteriorTeamList"
          element={
            <PrivateRoute>
              <InteriorTeamList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/AddLiferr"
          element={
            <PrivateRoute>
              <AddLiferr />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/ListLiferr"
          element={
            <PrivateRoute>
              <ListLiferr />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/AddTeamRR"
          element={
            <PrivateRoute>
              <AddTeamRR />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/ListTeamRR"
          element={
            <PrivateRoute>
              <ListTeamRR />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/CreateCategoryTeam"
          element={
            <PrivateRoute>
              <CreateCategoryTeam />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/AddCorporateGallery"
          element={
            <PrivateRoute>
              <AddCorporateGallery />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/CorporateGalleryList"
          element={
            <PrivateRoute>
              <CorporateGalleryList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/AddRetailGallery"
          element={
            <PrivateRoute>
              <AddRetailGallery />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/RetailGalleryList"
          element={
            <PrivateRoute>
              <RetailGalleryList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/AddWerehouseGallery"
          element={
            <PrivateRoute>
              <AddWerehouseGallery />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/WerehouseGalleryList"
          element={
            <PrivateRoute>
              <WerehouseGalleryList />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/AddInvestmentGallery"
          element={
            <PrivateRoute>
              <AddInvestmentGallery />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/InvestmentGalleryList"
          element={
            <PrivateRoute>
              <InvestmentGalleryList />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/InteriorGalleryList"
          element={
            <PrivateRoute>
              <InteriorGalleryList />{" "}
            </PrivateRoute>
          }
        />
        
        <Route
          path="/AddInteriorGallery"
          element={
            <PrivateRoute>
              <AddInteriorGallery />{" "}
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
