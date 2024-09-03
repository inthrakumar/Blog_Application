import { useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login,logout } from "./redux/slice/authSlice";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Logo from "./components/Logo"
import Auth_service from "./appwrite/auth"

useEffect(()=>{

},[])
function App() {
  const dispatch=useDispatch();
  
useEffect(()=>{
  Auth_service
            .getAccount()
            .then((userData) => {
                if (userData) dispatch(login({ userData }));
                else dispatch(logout());
            })
            .finally(() => setLoading(false));

},[dispatch])
return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
          <Header />
          <main>
              <Outlet />
          </main>
      </div>
      <div className="w-full block">
          <Footer />
      </div>
  </div>
) : null;
}

export default App;
