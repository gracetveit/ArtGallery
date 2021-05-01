import { Update } from '.prisma/client';
import { GetStaticProps } from 'next';

export default function Post({body, date}: {body: string | undefined, date: string | undefined}) {
    return (
        <div>
            <h2>{date}</h2>
            {body?.split("\r\n\r").map(p => (
                <p>{p}</p>
            ))}
        </div>
    )
}