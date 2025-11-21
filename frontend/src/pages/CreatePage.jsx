import { useEffect } from "react";
import { useNavigate } from "react-router";

// CreatePage removed — redirect users to home (recommendations app)
const CreatePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return null;
};
export default CreatePage;
