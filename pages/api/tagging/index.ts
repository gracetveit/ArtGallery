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
                const newTagging = await create(taggingParams(req));
                res.status(200).json(newTagging);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}

export type tagging = {
    id?: number
    chapterId: number
    tagId: number
    createdAt?: Date
    updatedAt?: Date
}

export function taggingParams(req: NextApiRequest) {
    let allowedParams: any = {};
    for (let [key, value] of Object.entries(req.query)) {
        switch(key) {
            case "tagging[chapter_id]":
                allowedParams.chapterId = parseInt(value as string);
                break
            case "tagging[tag_id]":
                allowedParams.tagId = parseInt(value as string);
                break
        }
    }
    return allowedParams;
}

export async function index() {
    return await prisma.tagging.findMany()
}

export async function create(data: tagging) {
    return await prisma.tagging.create({data})
}