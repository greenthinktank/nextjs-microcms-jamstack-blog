import next from "next";
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

// SSG
export const getStaticProps = async (content) => {
  // console.log(content.params.id);
  // URLに含まれているblogのidに基づいてブログの詳細を取得
  const id = content.params.id;
  // microCMSのルールに従って記述
  const data = await client.get({endpoint: "blog", contentId:id});
  return {
    props: {
      blog: data,
    },
  };
};

// next.jsで動的なページを作成する時は以下のようなpathの指定は必須
export const getStaticPaths = async () => {
  const data = await client.get({endpoint: "blog"});
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false //404 not foundが表示される
  };
};

export default function BlogId({blog}){
  return(
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div className={styles.post} dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
    </main>
  );
}