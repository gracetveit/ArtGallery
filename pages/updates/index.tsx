import { GetStaticProps } from 'next';

import Post from '../../components/post';
import PostList from '../../components/postList';
import Layout from '../../components/layout';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Home() {
    return (
        <Layout>
            <Post />
            <PostList />
        </Layout>
    )
}