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
                const newUpdate = await create({body: req.body});
                res.status(200).json(newUpdate);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}

export type update = {
    id?: number
    body: string
    createdAt?: Date
    updatedAt?: Date
}

export function updateParams(req: NextApiRequest) {
    let allowedParams: any = {};
    for (let [key, value] of Object.entries(req.query)) {
        switch(key) {
            case "update[body]":
                allowedParams.body = value as string;
                break
        }
    }
    return allowedParams;
}

export async function index() {
    return await prisma.update.findMany({
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    })
}

export async function create(data: update) {
    return await prisma.update.create({data})
}