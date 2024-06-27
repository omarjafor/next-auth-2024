'use client'

import { logOutAction } from "@/actions";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export default function Logout(){

    const { toast } = useToast();

    const handleLogout = async () => {
        await logOutAction();
        toast({ title: 'Log out successfull' });
    }

    return(
        <div>
            <Button onClick={handleLogout} className='mt-2'>Log out</Button>
        </div>
    )
}