import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout/Layout";
import Profile from "../pages/Profile/Profile";
import ProfileForm from "../pages/Profile/ProfileForm/ProfileForm";
import ChangePassword from "../pages/Profile/ChangePassword/ChangePassword";
import Dependents from "../pages/Profile/Dependents/Dependents";
import DependentForm from "../pages/Profile/DependentForm/DependentForm";
import Reservations from "../pages/Reservations/Reservations";
import Barbecue from "../pages/Reservations/Barbecue/Barbecue";
import Ticket from "../components/Ticket/Ticket";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route
            path={ROUTES.HOME}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.EDIT_PROFILE}
            element={
              <RequireAuth>
                <ProfileForm />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.CHANGE_PASSWORD}
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.DEPENDENTS}
            element={
              <RequireAuth>
                <Dependents />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.DEPENDENT_REGISTER}
            element={
              <RequireAuth>
                <DependentForm />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.DEPENDENT_EDIT}
            element={
              <RequireAuth>
                <DependentForm editMode={true}/>
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.RESERVATIONS}
            element={
              <RequireAuth>
                <Reservations/>
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.RESERVATIONS_BARBECUE}
            element={
              <RequireAuth>
                <Barbecue />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.RESERVATIONS_GYM}
            element={
              <RequireAuth>
                <Reservations/>
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.RESERVATIONS_HISTORY}
            element={
              <RequireAuth>
                <Reservations/>
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.RESERVATIONS_BARBECUE_INVITES}
            element={
              <RequireAuth>
                <Reservations/>
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.RESERVATIONS_INVITES}
            element={
              <RequireAuth>
                <Ticket/>
              </RequireAuth>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  
  let location = useLocation();

  if (!auth.user.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
