import SignUpForm from "../sign-up/sign-up.component";
import SignInForm from "../sign-in/sign-in.component";
import './authentication.styles.scss';

const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;