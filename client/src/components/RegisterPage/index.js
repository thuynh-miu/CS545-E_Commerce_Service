import { useRef } from "react";
import { Link } from "react-router-dom";


export default function RegisterPage(props) {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const roleRef = useRef(null);

    const handleRegister = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const role = roleRef.current.value;

    };
    return (
        <form className="container mt-5">
            <div className="card shadow p-4" style={{ maxWidth: "400px", margin: "auto" }}>
                <h3 className="text-center mb-4">Register</h3>
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
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Role
                    </label>
                    <select class="form-select" ref={roleRef}>
                        <option selected value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>
                </div>
                <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
                    Register
                </button>
                <Link to={'/login'} className="text-center">
                    Already have an account? Login
                </Link>
            </div>
        </form>
    )
}