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
                const newPage = await create(pageParams(req));
                res.status(200).json(newPage);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}

export type page = {
    id?: number
    sequenceNumber: number
    location: string
    chapterId: number
    createdAt?: Date
    updatedAt?: Date
}

export function pageParams(req: NextApiRequest) {
    let allowedParams: any = {};
    for (let [key, value] of Object.entries(req.query)) {
        switch(key) {
            case "page[sequence_number]":
                allowedParams.sequenceNumber = parseInt(value as string);
                break
            case "page[location]":
                allowedParams.location = value as string;
                break
            case "page[chapter_id]":
                allowedParams.chapterId = parseInt(value as string);
        }
    }
    return allowedParams;
}

export async function index() {
    return await prisma.page.findMany()
}

export async function create(data: page) {
    return await prisma.page.create({data})
}