import { Suspense, useState, lazy, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CustomOrder from './pages/CustomOrder';
import RepairRequestPage from './pages/RepairRequestPage';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useContext } from 'react';
import { storeProvider } from './Context/Context';
import ProtectedRoute from './components/Utils/ProtectedRoute';

function App() {
  const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
  const Team = lazy(() => import('./pages/Team'));
  const location = useLocation();
  // const history=useHistory()
  const hideNavbarOnRoutes = ['/customOrder', '/signUp', '/signIn'];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);
  const { userLogInData } = useContext(storeProvider);
  const [userLoginData, setUserLoginData] = useState(userLogInData);
  const loggedIn = userLoginData?.email ? true : false;
  useEffect(() => {
    setUserLoginData(userLogInData);
  }, [userLogInData]); 
  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        </Routes>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route element={<ProtectedRoute userLoggedData={loggedIn} />}>
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/meetTeam" element={<Team />} />
            <Route path="/customOrder" element={<CustomOrder />} />
            <Route path="/repairrequest" element={<RepairRequestPage />} />
            <Route path="/userProfile" element={<Profile />} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
