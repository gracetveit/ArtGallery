import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link'

import {index} from '../api/update/index';
import {show} from '../api/update/[id]';
import Post from '../../components/post'
import Layout from '../../components/layout'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let id = undefined
    if (params != undefined) {
        id = parseInt(params.id as string)
    }
    const post = await show(id as number);
    const body = post?.body
    const date = post?.createdAt.toString()
    return {
        props: {body, date}
    }
}

export const getStaticPaths: GetStaticPaths = async() => {
    const posts = await index();
    const paths = posts.map(post => ({
        params: { id: post.id.toString() },
    }))
    return {
        paths,
        fallback: false
    }
}

export default function Posting({body, date}: {body: string, date: string}) {
    return (
        <Layout>
            <Post body={body} date={date}/>
        </Layout>
    )
}