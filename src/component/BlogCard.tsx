import Link from 'next/link';
import { FC } from 'react';

interface Props {
    title: string,
    desc: string,
    slug: string
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
    return (
        <Link href={`/blogs/${slug}`} className='p-1'>
            <div className='bg-green-100 p-2 rounded cursor-pointer'>
                <h1 className='text-gray-900 text-3x1 font-semibold'>{title}</h1>
                <p className='text-gray-500'>{desc}</p>
            </div>
        </Link>
    );
};

export default BlogCard;