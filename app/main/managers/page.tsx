import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { initialProfile } from "@/lib/initial-profile";

const ManagersPage = async () => {

    const user = await initialProfile()
    const projects = await getProjectsByUserId();
    
    return (  
        <div className="p-5 h-full w-full">
            <EmptyState 
                title="Development Work underway Edited by Jainil Again !!! Development Final, By Vivek Kadam!!"
            />
        </div>
    );
}
 
export default ManagersPage;
