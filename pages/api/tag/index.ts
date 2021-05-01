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
                const newTag = await create(tagParams(req));
                res.status(200).json(newTag);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}

export type tag = {
    id?: number
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export function tagParams(req: NextApiRequest) {
    let allowedParams: any = {};
    for (let [key, value] of Object.entries(req.query)) {
        switch(key) {
            case "tag[name]":
                allowedParams.name = value as string;
                break
        }
    }
    return allowedParams;
}

export async function index() {
    return await prisma.tag.findMany()
}

export async function create(data: tag) {
    return await prisma.tag.create({data})
}