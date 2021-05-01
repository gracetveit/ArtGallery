import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import {index, chapterParams} from './index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.id as string)
    if (req.headers.authorization != process.env.AUTHENTICATION) {
        res.status(401).end("Invalid Authorization")
    } else if (await show(id) == null) {
        res.status(404).end(`Art with the id of ${id} not found`)
    } else {
        switch (req.method) {
            case 'GET':
                const foundChapter = await show(id);
                res.status(200).json(foundChapter);
                break
            case 'DELETE':
                remove(id);
                const feed = await index();
                res.status(200).json(feed);
                break;
            case 'PATCH':
                const updateChapter = await update(id, chapterParams(req))
                res.status(200).json(updateChapter);
                break
            default:
                res.setHeader('Allow', ['GET', 'DELETE', 'PATCH']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
    
}

export async function show(id: number) {
    return await prisma.chapter.findUnique({
        where: {id}
    })
}

export async function remove(id: number) {
    return await prisma.chapter.delete({
        where: {id}
    })
}

export async function update(id: number, data:any) {
    return await prisma.chapter.update({
        where: {id},
        data
    })
}