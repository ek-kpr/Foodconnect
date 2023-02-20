import Link from 'next/link';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import {sanityClient, urlFor} from "../sanity"
import post from '../sanitystudio/schemas/post'
import { Post } from '../typings'
import { Rating } from 'react-simple-star-rating';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Food Connect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="flex justify-between items-center border rounded-lg bg-slate-900 border-y border-slate-900 py-10 lg:py-5">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif text-slate-50">
            <span className="underline decoration-slate-50 decoration-4">
              FoodConnect
            </span>{" "}
            is a place to explore new restaurants, eat and connect with people
          </h1>
          <h2 className="text-slate-50">
            Easily find the best places for food in Germany and abroad
          </h2>
        </div>
        <img className="hidden md:inline-flex" src="/foodsection.jpg" alt="" />
      </div>

      {/*posts*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer border rounded-lg overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-slate-50">
                <div>
                  <p className="font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>

                  <div className="">
                    <p className="text-xs">
                      <span className="justify-self-start pt-2">
                        Read time {post.readtime} Minutes
                      </span>
                    </p>
                    <p className="text-xs">
                      <span className=" justify-self-end ">
                        <Rating
                          SVGclassName="inline-block"
                          size={24}
                          readonly={true}
                          initialValue={post.FoodRating}
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt={post.author.name}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  description,
  mainImage,
  FoodRating,
  readtime,
  author -> {
    name,
    image,
    }
}`;

const posts = await sanityClient.fetch(query);
console.log(posts);
return {
  props: {
    posts,
  }
  
}
}