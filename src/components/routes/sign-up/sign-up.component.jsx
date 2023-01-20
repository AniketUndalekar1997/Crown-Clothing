import { useState } from "react";
import Button from "../../Button/button.component";

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../../utils/firebase/firebase.utils";
import { FormInput } from "../../form-input/form-input.component";

import './sign-up-form.styles.scss';


const formFieldDictionary = {
    'displayName':'',
    'email':'',
    'password':'',
    'confirmPassword':''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(formFieldDictionary);
    const {displayName, email, password, confirmPassword} = formFields;


    const resetFormFields = () => {
        setFormFields(formFieldDictionary);
      };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]:value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password!==confirmPassword){
            console.log("password not matched");
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password,
            )
            
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        }catch(error){
            console.log("Error Occured", error.message);
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />
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
               <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
               />
               <Button buttonType='google' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;