import { useRef } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api";

export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }
        login({
            email,
            password,
        });
    };

    return (
        <form className="container mt-5">
            <div className="card shadow p-4" style={{ maxWidth: "400px", margin: "auto" }}>
                <h3 className="text-center mb-4">Login</h3>
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
                <button className="btn btn-primary w-100 py-2 rounded-pill mb-3" onClick={handleLogin}>
                    Log In
                </button>
                <div className="text-center">
                    <Link to="/register" className="text-decoration-none text-primary">
                        Not a user? Register
                    </Link>
                </div>
            </div>
        </form>
    );
}
