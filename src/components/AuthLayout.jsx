import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AuthLayout({ children, authentication = true }) {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);
  useEffect(() => {
    if (authentication && authstatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authstatus !== authentication) {
      navigate("/");
    }
    setloader(false);
  }, [authstatus, authentication, navigate]);
  return loader ? null :<>{children}</>;
}

export default AuthLayout;
