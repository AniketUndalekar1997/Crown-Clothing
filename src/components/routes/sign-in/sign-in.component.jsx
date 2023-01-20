import { useState } from "react";

import { 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword 
} from "../../../utils/firebase/firebase.utils";
import { FormInput } from "../../form-input/form-input.component";
import './sign-in-form.styles.scss';

import Button from "../../Button/button.component";

const defaultFormFields = {
    'email':'',
    'password':'',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]:value })
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWIthGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
           const { user } = await signInAuthUserWithEmailAndPassword(email, password);
           resetFormFields();

        }catch(error){
           switch(error.code){
            case 'auth/wrong-password':
                alert('Incorrect password for email');
                break;
            case 'auth/user-not-found':
                alert('no user is associated with email')
            default:
                console.log(error);
        }
      }
    };


    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={signInWIthGoogle} buttonType='google'>
                       Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;