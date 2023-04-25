import BlogCard from '@/component/BlogCard';
import { GetStaticProps, NextPage } from 'next';
import { Post, usePosts } from '../../hooks/posts';
import { useError } from '../../hooks/error';
import * as api from '@/pages/api/posts';
import { dehydrate } from '@tanstack/react-query';
import { queryClient } from '@/utility/query-client';
import { pushUpJoke } from '@/hooks/joke';

interface Props { }

const Blogs: NextPage<Props> = () => {
  const { data, isLoading } = usePosts();
  const { refetch: refetchError } = useError();

  return (
    <>
      <div className='max-w-3xl mx-auto p-5 space-y-5'>
        {isLoading && <div>Loading...</div>}
        {!isLoading && data?.map((post: Post) => <BlogCard key={post.slug} title={post.title} desc={post.meta} slug={post.slug} />)}
      </div>

      <div className='fixed left-5 top-5 flex flex-col'>
        <button onClick={() => refetchError()} className="bg-red-500 hover:bg-red-700 text-white font-bold my-1 py-2 px-4 rounded">
          Check how the exceptions work!!!
        </button>

        <button onClick={() => pushUpJoke()} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold my-1 py-2 px-4 rounded">
          Give me a joke!!!
        </button>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: () => api.readPostsInfo() })
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default Blogs;