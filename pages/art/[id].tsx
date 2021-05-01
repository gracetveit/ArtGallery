import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link'

import {index} from '../api/update/index'

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
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

export default function Art() {
    return (
        <div>
            <p>This is a Post</p>
        </div>
    )
}