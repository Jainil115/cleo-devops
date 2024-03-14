import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { PrismaClient } from '@prisma/client';

interface IParams {
    resourceId?: string;
}

export default async function getProjectByResourceId(params: IParams) {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        const { resourceId } = params;

        if (!resourceId) {
            throw new Error('Resource ID is required');
        }

        const resource = await db.resource.findUnique({
            where: {
                id: resourceId,
            },
            include: {
                project: true,
            },
        });

        if (!resource) {
            throw new Error('Resource not found');
        }

        return resource.project;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
