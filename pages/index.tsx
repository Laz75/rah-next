import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactChild, ReactFragment, ReactPortal } from 'react'
import styles from '../styles/Home.module.scss'
import dayjs from 'dayjs';
import { InferGetStaticPropsType } from 'next'

const Home: NextPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Robert A. Heinlein - L'uomo che vendette la Luna</title>
        <meta name="description" content="Primo e unico sito italiano dedicato al Maestro della fantascienza Robert A. Heinlein." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a className={styles.header__name}>Robert A. Heinlein -  L'uomo che vendette la Luna</a>
        </Link>
      </header>

      <main className={styles.main}>
        <ol className={styles.homelist}>
        {posts.map((post: { date: string | number | Date | dayjs.Dayjs | null | undefined; slug: any; title: { rendered: any } }) => (
            // eslint-disable-next-line react/jsx-key
            <li key={post.slug}>
              <Link
                href={{
                  pathname: '/[year]/[month]/[day]/[slug]',
                  query: { 
                    year: dayjs(post.date).format('YYYY'), 
                    month: dayjs(post.date).format('MM'), 
                    day: dayjs(post.date).format('DD'), 
                    slug: post.slug },
                }}
                passHref
              >
                <a><h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></a>
              </Link>
            </li>
        ))}
        </ol>
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
  const res = await fetch('https://www.jimsteinman.it/rah/wp-json/wp/v2/posts?_embed&page=' + 1)
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}


export default Home
