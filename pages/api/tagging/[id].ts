import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import {index, taggingParams} from './index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = getId(req.query.id as string)
    console.log(id)
    if (req.headers.authorization != "X18YyazOyoiIJi8OS5GRdoOv") {
        res.status(401).end("Invalid Authorization")
    } else if (await show(id) == null) {
        res.status(404).end(`Art with the id of ${id} not found`)
    } else {
        switch (req.method) {
            case 'GET':
                const foundTagging = await show(id);
                res.status(200).json(foundTagging);
                break
            case 'DELETE':
                remove(id);
                const feed = await index();
                res.status(200).json(feed);
                break;
            case 'PATCH':
                const updateTagging = await update(id, taggingParams(req))
                res.status(200).json(updateTagging);
                break
            default:
                res.setHeader('Allow', ['GET', 'DELETE', 'PATCH']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
    
}

function getId(id:string) {
    let idArray = id.split("_")
    return idArray.map(idInArray => (
        parseInt(idInArray)
    ))
}

export async function show(id: Array<any>) {
    return await prisma.tagging.findUnique({
        where: {
            chapterId_tagId: {
                chapterId: id[0],
                tagId: id[1]
            }
        }
    })
}

export async function remove(id: Array<any>) {
    return await prisma.tagging.delete({
        where: {
            chapterId_tagId: {
                chapterId: id[0],
                tagId: id[1]
            }
        }
    })
}

export async function update(id: Array<any>, data:any) {
    return await prisma.tagging.update({
        where: {
            chapterId_tagId: {
                chapterId: id[0],
                tagId: id[1]
            }
        },
        data
    })
}