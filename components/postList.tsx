import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function PostList() {
    return (
        <div>
            <p>Post List</p>
        </div>
    )
}