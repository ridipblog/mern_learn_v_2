const Login = () => {
    const google = () => {
        window.open("http://localhost:4000/auth/google", "__self");
    }
    return (
        <div>
            <button onClick={google}>Google</button>
        </div>
    )
}
export default Login;