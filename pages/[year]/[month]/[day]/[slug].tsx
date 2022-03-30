

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../../styles/Home.module.scss'
import dayjs from 'dayjs';
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
import { InferGetStaticPropsType } from 'next'

const Article : NextPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title> {post !== undefined ? post[0].title.rendered : ''}</title>
        <meta name="description" content="Primo e unico sito italiano dedicato al Maestro della fantascienza Robert A. Heinlein." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a className={styles.header__name}>Robert A. Heinlein -  L'uomo che vendette la Luna</a>
        </Link>
      </header>

      <main className={styles.main}>
        {post !== undefined ? (
          <><h1 dangerouslySetInnerHTML={{ __html: post[0].title.rendered }} /><p>
            {post[0].date !== '' ? dayjs(post[0].date).format('LL') : ''} - {post[0]._embedded.author[0].name}
          </p><div dangerouslySetInnerHTML={{ __html: post[0].content.rendered }} /></>
        ) : ''}
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  )
}

import { GetStaticProps } from 'next'
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://www.jimsteinman.it/rah/wp-json/wp/v2/posts?slug=' + context?.params?.slug + '&_embed')
  const post = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths(context: any) {
  const res = await fetch('https://www.jimsteinman.it/rah/wp-json/wp/v2/posts?_embed&page=' + 1)
  const posts = await res.json()
  const paths = posts.map((post: { date: string | number | dayjs.Dayjs | Date | null | undefined; slug: any; }) => ({ 
    params: { 
      year: dayjs(post.date).format('YYYY'),
      month: dayjs(post.date).format('MM'), 
      day: dayjs(post.date).format('DD'), 
      slug: post.slug
     } 
  })
);
  return {
    paths,
    fallback: true // false or 'blocking'
  };
}


export default Article