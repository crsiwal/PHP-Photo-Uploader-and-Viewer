import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);
};

export default Logout;
