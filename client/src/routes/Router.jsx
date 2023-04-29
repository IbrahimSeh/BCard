import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";

import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "../Pages/SignUpPage";
import UserProfilePage from "../Pages/UserProfilePage";
import FavCardsPage from "../Pages/FavCardsPage";
import MyCardsPage from "../Pages/MyCardsPage";
import SandBoxPage from "../Pages/SandBoxPage";
import PageNotFound from "../Pages/PageNotFound";
import IsLoginPR from "../components/ProtectedRoute/IsLoginPR";
import IsBizPR from "../components/ProtectedRoute/IsBizPR";

// import ReRenderPage from "../pages/ReRenderPage/ReRenderPage";
// import UseMemoPage from "../pages/ReRenderPage/UseMemoPage";
// import RP1 from "../pages/RP1";
// import RP2 from "../pages/RP2";
// import ProtectedRoute from "../components/ProtectedRoute";
// import ProfilePage from "../pages/ProfilePage";
// import SuperProtectedRoute from "../components/SuperProtectedRoute";
// import LogoutPage from "../pages/LogoutPage";
// import NestedRoutePage from "../pages/NestedRoutePage";
// import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
// import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";

//element={<ProtectedRoute element={<LogoutPage />} />}

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      <Route path={ROUTES.PROFILE} element={<UserProfilePage />} />
      <Route path={ROUTES.LOGOUT} element={<HomePage />} />

      <Route
        path={ROUTES.FAVCARDS}
        element={<IsLoginPR element={<FavCardsPage />} />}
      />

      {/* <Route
        path={ROUTES.MYCARDS}
        element={<IsLoginPR element={<IsBizPR element={<MyCardsPage />} />} />}
      /> */}

      <Route path={ROUTES.SANDBOX} element={<SandBoxPage />} />
      <Route path="*" element={<PageNotFound />} />
      {/* 
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/createcard"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<h1>Create card</h1>}
          />
        }
      />
      <Route path="/rrp" element={<ReRenderPage />} />
      <Route path="/usememo" element={<UseMemoPage />} />
      <Route path="/rp1" element={<RP1 />} />
      <Route path="/rp2" element={<RP2 />} />
      <Route path="/nr" element={<NestedRoutePage />}>
        <Route path="nestedpage1" element={<NestedPage1 />} />
        <Route path="nestedpage2" element={<NestedPage2 />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} /> */}
    </Routes>
  );
};

export default Router;
