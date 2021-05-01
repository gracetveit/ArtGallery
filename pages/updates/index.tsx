import { GetStaticProps } from 'next';
import { Update } from '.prisma/client';

import Post from '../../components/post';
import PostList from '../../components/postList';
import Layout from '../../components/layout';
import {index} from '../api/update/index';

import prisma from '../../lib/prisma'



export const getStaticProps: GetStaticProps = async () => {
    const posts = await index();
    const mostRecentPost = posts[0]
    const body = mostRecentPost?.body
    const date = mostRecentPost?.createdAt.toString();
    const postList = posts.map(post => (post.createdAt.toString()))
    return {
        props: {body, date, postList}
    }
}

export default function Home(
    {body, date, postList}: 
    {body: string, date: string, postList: string[]}
    ) {
    return (
        <Layout>
            <Post body={body} date={date}/>
            <PostList list={postList}/>
        </Layout>
    )
}