// 参考動画：https://youtu.be/dNpONz4Yi04
import Link from 'next/link';
import { client } from '../libs/client';
import styles from '../styles/Home.module.scss'

// SSG（Static Site Generation:静的サイトを生成するPre-redndering）で表示
export const getStaticProps = async () => {
  const data = await client.get({endpoint: "blog"});
  console.log(data);
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function Home({blog}) {
  return (
    /* 複数の投稿記事をそれぞれ取り出すためにmap */
    <div className={styles.container}>
      {blog.map((blog)=>(
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </div>
  )
}
