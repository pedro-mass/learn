import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { type RouterOutputs, api } from "~/utils/api";

const PostPage: NextPage = () => {
  // start fetching ASAP
  api.posts.getAll.useQuery();

  const user = useUser();
  if (!user?.isLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <h1>Post View</h1>
        </div>
      </main>
    </>
  );
};

export default PostPage;