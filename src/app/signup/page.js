'use client'

import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { initialRegFormData, regformControls } from '../utils';
import CommonElement from '@/components/form-element';
import { Button } from '@/components/ui/button';
import { signUpAction } from '@/actions';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [signUpFormData, setSignUpFormData] = useState(initialRegFormData);

    function handleButtonValid(){
        return Object.keys(signUpFormData).every(key => signUpFormData[key].trim() !== '')
    }

    async function handleSignUp() {
        const result = await signUpAction(signUpFormData);
        if(result?.success){
            toast({ title: result?.message });
            router.push('/signin');
        }
    }

    return (
        <div className='max-w-4xl mx-auto space-y-2'>
            <h1 className="text-center text-2xl font-bold mt-4">Welcome To Sign Up</h1>
            <form action={handleSignUp}>
                {
                    regformControls.map((data, index) => 
                        <div key={index}>
                            <Label>{data.label}</Label>
                            <CommonElement item={data} value={signUpFormData[data.name]} onChange={e => setSignUpFormData({
                                ...signUpFormData,
                                [e.target.name]: e.target.value
                            })}/>
                        </div>
                    )
                }
                <Button className='disabled:opacity-65 my-2' disabled={!handleButtonValid()} type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUp;