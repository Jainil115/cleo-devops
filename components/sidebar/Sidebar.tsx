"use client"

import { Briefcase, Plus, Settings, User, UserRoundPlus } from "lucide-react"
import { SidebarItem } from "./SidebarItem"
import { Button } from "../reusable/Button"
import Image from "next/image"
import { usePathname } from "next/navigation"
import useCreateModal from "@/hooks/useLoginModal"


interface SidebarProps {
    user: any;
}

export const Sidebar = ({
    user,
}: SidebarProps) => {

    const createModal = useCreateModal()
    const pathname = usePathname();

    return (
        <div className="h-full hidden md:block w-full bg-white dark:bg-black transition p-5 dark:border-neutral-800 border-r-2">
            <div className="h-[40%] w-full gap-12 flex flex-col">
                <div className="flex items-center gap-2">
                    <Image
                        src={'/logo.png'}
                        alt="logo"
                        height={36}
                        width={36}
                    />
                    <div className="text-md leading-5 font-bold">Customer <br/>success</div>
                </div>
                <div className="flex flex-col h-[20%] w-full">
                    {user.role === "ADMIN" ? (
                            <Button
                                onClick={createModal.onOpen}
                                label="Add project" 
                                color="bg-cyan-500" 
                                className="p-2 bg-blue-500 rounded-[5px] flex items-center text-sm text-white w-full" 
                                icon={<Plus className="scale-[0.8]"/>}
                            />
                        ) : (
                            <div></div>
                        )
                    }
                </div>

                <div className="flex flex-col h-[70%] w-full gap-3 -mt-8">
                    <SidebarItem 
                        label="Projects" 
                        to="main/projects"
                        icon={ <Briefcase/>}
                        highlight="text-red-600"
                        isActive = {pathname?.startsWith('/main/projects')}
                        
                    />
                    <SidebarItem 
                        label="Managers"  
                        to="main/managers"
                        icon={ <User/>}
                        highlight="text-green-600"
                        isActive = {pathname?.startsWith('/main/managers')}
                    />
                    <SidebarItem 
                        label="Employees"  
                        to="main/employees"
                        icon={ <UserRoundPlus/>}
                        highlight="text-green-600"
                        isActive = {pathname?.startsWith('/main/employees')}
                    />
                    <SidebarItem 
                        label="Settings"  
                        to="main/settings"
                        icon={ <Settings/>}
                        highlight="text-green-600"
                        isActive = {pathname?.startsWith('/main/settings')}
                    />
                </div>
                
            </div>
        </div>
    )
}