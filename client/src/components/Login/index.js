import { useRef } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api";


export default function Login(props) {
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
        login(
            {
                email: email,
                password: password
            }
        )
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
                        type="text"
                        id="email"
                        ref={emailRef}
                        className="form-control"
                        placeholder="Enter your email"
                        required={true}
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
                <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                    Log In
                </button>
                <Link to={'/register'} className="text-center">
                    Not a user? Register
                </Link>
            </div>
        </form>
    )
}