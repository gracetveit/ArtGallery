import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const feed = await index();
            res.status(200).json(feed);
            break
        case 'POST':
            const newArt = await create(artParams(req));
            res.status(200).json(newArt);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

type art = {
    id?: number
    title: string
    type: string
    thumbnail: string
    createdAt?: Date
    updatedAt?: Date
}

function artParams(req: NextApiRequest) {
    const title = req.query["art[title]"] as string
    const type = req.query["art[type]"]  as string
    const thumbnail = req.query["art[thumbnail]"]  as string
    return {title, type, thumbnail}
}

export async function index() {
    return await prisma.art.findMany()
}

export async function create(art: art) {
    return await prisma.art.create({data: art})
}