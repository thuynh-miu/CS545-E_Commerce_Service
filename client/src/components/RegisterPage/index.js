import { useRef } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const role = roleRef.current.value;

    console.log({ username, password, role });
  };

  return (
    <form className="container py-5">
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
        <div className="mb-4">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select className="form-select" ref={roleRef}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <button
          className="btn btn-primary w-100 py-2 rounded-pill mb-3"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="text-center">
          <Link to="/login" className="text-decoration-none text-primary">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </form>
  );
}
