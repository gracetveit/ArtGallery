import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Gallery() {
    return (
        <div>
            <p>This is the Gallery</p>
        </div>
    )
}