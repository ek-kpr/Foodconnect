import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { Separator } from "../../components/ui/seperator";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/ui/button";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

interface IFormInput {
  //types for form
  _id: String;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "post",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <Header></Header>
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div className="flex items-center space-x-4">
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />
          <p className="font-extralight text-sm">
            Blog post by
            <span className="text-green-600"> {post.author.name} </span>
          </p>
          <p className="font-extralight text-sm">
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
          <p className="font-extralight text-sm">
            Read time {post.readtime} Minutes
          </p>
        </div>

        <Separator className="border-slate-100 my-1 mx-auto border" />
        <div className="mt-10">
          <PortableText //get body of a post / add new Tags if needed
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-2xl font-bold my-5" {...props} />
              ),
              h3: (props: any) => (
                <h3 className="text-3xl font-bold my-5" {...props} />
              ),
              h4: (props: any) => (
                <h4 className=" text-4xl font-bold my-5" {...props} />
              ),
              li: (children: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-slate-900 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>

        <Separator className="border-slate-100 my-1 mx-auto border" />
        <div className="mt-4">
          <p className="text-xl font-semibold">Food</p>
          <Rating
            SVGclassName="inline-block"
            size={24}
            readonly={true}
            initialValue={post.FoodRating}
          />
          <p className="text-xl font-semibold">Ambient</p>
          <Rating
            SVGclassName="inline-block"
            size={24}
            readonly={true}
            initialValue={post.AmbientRating}
          />
          <p className="text-xl font-semibold">Price</p>
          <Rating
            SVGclassName="inline-block"
            size={24}
            readonly={true}
            initialValue={post.PriceRating}
          />
          <p className="text-xl font-semibold">Service</p>
          <Rating
            SVGclassName="inline-block"
            size={24}
            readonly={true}
            initialValue={post.ServiceRating}
          />
        </div>
      </article>
      <div>
        <div className="space-y-16"></div>
        <Separator className="max-w-lg my-5 mx-auto border border-slate-900" />
      </div>

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-slate-900 text-slate-50 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm font-bold text-green-600">
            Enjoyed this article?
          </h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <Separator className="border-slate-100 mt-3 mb-3" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <div className="grid w-full max-w-m items-center gap-1.5">
              <Label htmlFor="Name">Name</Label>
              <Input
                {...register("name", { required: true })}
                type="Name"
                id="Name"
                placeholder="name"
              />
            </div>
          </label>
          <label className="block mb-5">
            <div className="grid w-full max-w-m items-center gap-1.5">
              <Label htmlFor="Email">Email</Label>
              <Input
                {...register("email", { required: true })}
                type="Email"
                id="Email"
                placeholder="email"
              />
            </div>
          </label>
          <div className="grid w-full max-wm gap-1.5">
            <label className="block mb-5">
              <Label htmlFor="Comment">Comment</Label>
              <Textarea
                {...register("comment", { required: true })}
                placeholder="Type your message here."
                id="comment"
              />
            </label>
          </div>
          {/*errors when validation fails*/}
          <div className="flex flex-col p-5">
            <Button type="submit" className="px-4" variant="default">
              <input type="submit"></input>
            </Button>

            {errors.name && (
              <span className="text-red-500 text-sm">
                -The Name Field is required
              </span>
            )}
            {errors.email && (
              <span className="text-red-500 text-sm">
                -The Email Field is required
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500 text-sm">
                -The Comment Field is required
              </span>
            )}
          </div>
        </form>
      )}
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-slate-900 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <Separator className="max-w-lg my-5 mx-auto border border-slate-100" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-slate-900 font-bold">{comment.name}</span>:{" "}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  //set current link
  const query = `*[_type == "post"]{
  _id,
  slug {
    current
  }
    }
`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //get data for the post
  const query = `*[_type == "post" && slug.current == $slug] [0]{
        _id,
        _createdAt,
        title,
        description,
        mainImage,
        slug,
        body,
        AmbientRating,
        ServiceRating,
        PriceRating,
        FoodRating,
        readtime,
        author -> {
            name,
            image,},
        'comments': * [
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true],
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds it will update the old cached version
  };
};
