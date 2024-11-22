import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api";
import { UserContext } from "../../contexts/UserContextProvider";

export default function Login(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const {userData, userDispatch} = useContext(UserContext);
    console.log(userData)

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }
        login({
            email: email,
            password: password,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Received status code ${response.status}`);
                }
            })
            .then(({accessToken, refreshToken}) => {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
                alert("Incorrect username or password");
            });
    };
    return (
        <form className="container mt-5">
            <div
                className="card shadow p-4"
                style={{ maxWidth: "400px", margin: "auto" }}
            >
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
                <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={handleLogin}
                >
                    Log In
                </button>
                <Link to={"/register"} className="text-center">
                    Not a user? Register
                </Link>
            </div>
        </form>
    );
}
