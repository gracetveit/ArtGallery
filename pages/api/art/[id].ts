import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import {index, artParams} from './index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.id as string)
    if (req.headers.authorization != "X18YyazOyoiIJi8OS5GRdoOv") {
        res.status(401).end("Invalid Authorization")
    } else if (await show(id) == null) {
        res.status(404).end(`Art with the id of ${id} not found`)
    } else {
        switch (req.method) {
            case 'GET':
                const foundArt = await show(id);
                res.status(200).json(foundArt);
                break
            case 'DELETE':
                remove(id);
                const feed = await index();
                res.status(200).json(feed);
                break;
            case 'PATCH':
                const updateArt = await update(id, artParams(req))
                res.status(200).json(updateArt);
                break
            default:
                res.setHeader('Allow', ['GET', 'DELETE', 'PATCH']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
    
}

export async function show(id: number) {
    return await prisma.art.findUnique({
        where: {id}
    })
}

export async function remove(id: number) {
    return await prisma.art.delete({
        where: {id}
    })
}

export async function update(id: number, data:any) {
    return await prisma.art.update({
        where: {id},
        data
    })
}