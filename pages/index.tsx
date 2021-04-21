import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
    const test = await prisma.art.findMany()
    console.log(test)
    return {
        props: {}
    }
}

export default function Home() {
    return <h1>Hello World</h1>
}