'use client'
import { useState } from 'react';
import { initialLogFormData, logformControls } from '../utils';
import { Label } from '@/components/ui/label';
import CommonElement from '@/components/form-element';
import { Button } from '@/components/ui/button';

const SignIn = () => {
    const [signInFormData, setSignInFormData] = useState(initialLogFormData);

    function handleButtonValid() {
        return Object.keys(signInFormData).every(key => signInFormData[key].trim() !== '')
    }

    async function handleSignIn() {
        
    }

    return (
        <div className='max-w-4xl mx-auto space-y-2'>
            <h1 className="text-center text-2xl font-bold mt-4">Welcome To Login</h1>
            <form action={handleSignIn}>
                {
                    logformControls.map((data, index) =>
                        <div key={index}>
                            <Label>{data.label}</Label>
                            <CommonElement item={data} value={signInFormData[data.name]} onChange={e => setSignInFormData({
                                ...signInFormData,
                                [e.target.name]: e.target.value
                            })} />
                        </div>
                    )
                }
                <Button className='disabled:opacity-65 my-2' disabled={!handleButtonValid()} type='submit'>Login</Button>
            </form>
        </div>
    );
};

export default SignIn;