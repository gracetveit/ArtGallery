import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.headers.authorization != "X18YyazOyoiIJi8OS5GRdoOv") {
        res.status(401).end("Invalid Authorization")
    } else {
        switch (req.method) {
            case 'GET':
                const feed = await index();
                res.status(200).json(feed);
                break
            case 'POST':
                const newChapter = await create(chapterParams(req));
                res.status(200).json(newChapter);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}

export type chapter = {
    id?: number
    title: string
    sequenceNumber: number
    artId: number
    thumbnail: string
    createdAt?: Date
    updatedAt?: Date
}

export function chapterParams(req: NextApiRequest) {
    let allowedParams: any = {};
    for (let [key, value] of Object.entries(req.query)) {
        switch(key) {
            case "chapter[title]":
                allowedParams.title = value as string;
                break
            case "chapter[sequence_number]":
                allowedParams.sequenceNumber = parseInt(value as string);
                break
            case "chapter[thumbnail]":
                allowedParams.thumbnail = value as string;
                break
            case "chapter[art_id]":
                allowedParams.artId = parseInt(value as string);
        }
    }
    return allowedParams;
}

export async function index() {
    return await prisma.chapter.findMany()
}

export async function create(data: chapter) {
    return await prisma.chapter.create({data})
}