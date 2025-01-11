import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../services/users/login";
import { validateEmail } from "../../helpers/emailValidator";
import { login } from "../../store/features/auth/authSlice";

/* Load Assets */
import logo from "../../assets/images/logo.png";
import LoggedOutLayout from "../../layout/LoggedOutLayout";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Effect to clear the error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Clear the error after 5 seconds
      }, 8000);

      // Cleanup the timer on component unmount or when error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (email === "") throw new Error("Email address should not be blank");
      if (!validateEmail(email)) throw new Error("Email address should be valid");
      if (password === "") throw new Error("Password can not be blank");

      const response = await loginUser({ email, password });
      if (response.id) {
        dispatch(login(response));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoggedOutLayout>
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mt-3">
                    <button onClick={handleLogin} type="button" disabled={loading} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                        <i className="input-helper"></i>
                      </label>
                    </div>
                    <div className="auth-link text-black">Forgot password?</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoggedOutLayout>
  );
};

export default Login;
