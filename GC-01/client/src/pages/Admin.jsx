import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TableSneakers from "../components/TableSneakers";

function Admin() {
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [navigate, user, loading]);
  return (
    <div className="container mx-auto space-y-3 md:space-y-6">
      <h1 className="text-2xl font-bold ml-5 md:ml-12 mt-3 md:mt-6">SNKRS</h1>
      <TableSneakers />
    </div>
  );
}

export default Admin;
