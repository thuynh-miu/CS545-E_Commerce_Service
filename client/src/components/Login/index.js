import { useRef } from "react";
import { Link } from "react-router-dom";


export default function Login(props) {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        // if (username && password) {
        //     alert(`Logging in with Username: ${username}`);
        // } else {
        //     alert("Please fill in both fields.");
        // }
    };
    return (
        <form className="container mt-5">
            <div className="card shadow p-4" style={{ maxWidth: "400px", margin: "auto" }}>
                <h3 className="text-center mb-4">Login</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={usernameRef}
                        className="form-control"
                        placeholder="Enter your username"
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