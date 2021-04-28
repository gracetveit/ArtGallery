import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const RinasNight = await prisma.art.create({
        data: {
            title: "Rina's Night",
            type: "Comic",
            thumbnail: "rinaThumb.jpg"
        }
        
    })
    const RinaChapter = await prisma.chapter.create({
        data: {
            title: "Chapter 1",
            sequenceNumber: 1,
            thumbnail: "rinaThumb.jpg",
            artId: RinasNight.id
        }
    })
    const RinaPage1 = await prisma.page.create({
        data: {
            sequenceNumber: 1,
            location: "01_rinaHQ.jpg",
            chapterId: RinaChapter.id
        }
    })
    const RinaPage2 = await prisma.page.create({
        data: {
            sequenceNumber: 2,
            location: "02_rinaHQ.jpg",
            chapterId: RinaChapter.id
        }
    })
    const RinaPage3 = await prisma.page.create({
        data: {
            sequenceNumber: 3,
            location: "03_rinaHQ.jpg",
            chapterId: RinaChapter.id
        }
    })
    const TF = await prisma.tag.create({
        data: {
            name: "Transformation"
        }
    })
    const tfTag = await prisma.tagging.create({
        data: {
            chapterId: RinaChapter.id,
            tagId: TF.id
        }
    })
    const jag = await prisma.art.create({
        data: {
            title: "Jaguar Transformation",
            type: "Painting",
            thumbnail: "jagThumb.jpg"
        }
    })
    const jagChapter = await prisma.chapter.create({
        data: {
            title: "Chapter 1",
            sequenceNumber: 1,
            thumbnail: "jagThumb.jpg",
            artId: jag.id
        }
    })
    const jagPage = await prisma.page.create({
        data: {
            sequenceNumber: 1,
            location: "Jaguar Transformation.jpg",
            chapterId: jagChapter.id
        }
    })
    const chloe = await prisma.art.create({
        data: {
            type: "Sketch",
            thumbnail: "chlowolfThumb.jpg"
        }
    })
    const choleChapter = await prisma.chapter.create({
        data: {
            title: "Chapter 1",
            sequenceNumber: 1,
            thumbnail: "chlowolfThumb.jpg",
            artId: chloe.id
        }
    })
    const chloePage = await prisma.page.create({
        data: {
            sequenceNumber: 1,
            location: "chlowolf.jpg",
            chapterId: choleChapter.id
        }
    })
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })