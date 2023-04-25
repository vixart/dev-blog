import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { readPostsInfo } from '../api/posts';
import { readFile } from '../../utility/file-reader';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SinglePostPage: NextPage<Props> = ({ post }) => {
    const { content, title } = post;
    return (
        <div className='max-w-3xl mx-auto'>
            <h1 className='font-semibold text-2xl py-5'>{title}</h1>
            <div className='prose pb-10'>
                <MDXRemote {...content} />
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = () => {
    const posts = readPostsInfo();
    const paths = posts.map((post) => ({ params: { postSlug: post.slug } }));
    return {
        paths,
        fallback: 'blocking'
    }
}

interface IStaticProps extends ParsedUrlQuery {
    postSlug: string
}

type Post = {
    post: {
        title: string,
        content: MDXRemoteSerializeResult
    }
}

export const getStaticProps: GetStaticProps<Post> = async (context) => {
    const { postSlug } = context.params as IStaticProps;

    const filePathToRead = path.join(process.cwd(), `posts/${postSlug}.md`);

    let fileContent = readFile(filePathToRead);
    if (!fileContent) return { notFound: true };

    const source: any = await serialize(fileContent, { parseFrontmatter: true });

    return {
        props: {
            post: {
                content: source,
                title: source.frontmatter.title
            }
        }
    }
}

export default SinglePostPage;