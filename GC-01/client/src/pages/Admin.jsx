import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Admin() {
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [navigate, user, loading]);
  return <div>Admin</div>;
}

export default Admin;
