import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api";
import { UserContext } from "../../contexts/UserContextProvider";
import { LoginContext } from "../../contexts/LoginStatusProvider";

export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const { userDispatch } = useContext(UserContext);
    const { setIsLoggedIn } = useContext(LoginContext);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            setErrorMessage("Please fill in both email and password.");
            return;
        }

        setLoading(true);
        try {
            const { accessToken, refreshToken } = await login({ email, password });
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message || "Incorrect username or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="container mt-5" onSubmit={handleLogin}>
            <div
                className="card shadow p-4 border-light"
                style={{ maxWidth: "400px", margin: "auto", borderRadius: "8px" }}
            >
                <h3 className="text-center mb-4">Login</h3>

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        className="form-control"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        className="form-control"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                    ) : (
                        "Log In"
                    )}
                </button>

                <div className="text-center">
                    <Link to={"/register"}>Not a user? Register</Link>
                </div>
            </div>
        </form>
    );
}
