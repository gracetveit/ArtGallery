import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Post() {
    return (
        <div>
            <p>This is a Post</p>
        </div>
    )
}