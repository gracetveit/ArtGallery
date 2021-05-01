import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.headers.authorization != process.env.AUTHENTICATION) {
        res.status(401).end("Invalid Authorization")
    } else {
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
}

export type art = {
    id?: number
    title: string
    type: string
    thumbnail: string
    createdAt?: Date
    updatedAt?: Date
}

export function artParams(req: NextApiRequest) {
    let allowedParams: any = {};
    for (let [key, value] of Object.entries(req.query)) {
        switch(key) {
            case "art[title]":
                allowedParams.title = value as string;
                break
            case "art[type]":
                allowedParams.type = value as string;
                break
            case "art[thumbnail]":
                allowedParams.thumbnail = value as string;
                break
        }
    }
    return allowedParams;
}

export async function index() {
    return await prisma.art.findMany()
}

export async function create(data: art) {
    return await prisma.art.create({data})
}