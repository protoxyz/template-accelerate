import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import PostForm from "../../../components/PostForm";

function Page({}) {
  const router = useRouter();
  return (
    <>
      <PostForm id={router.query.postId as string} />
    </>
  );
}

Page.getLayout = (page: any) => {
  return <Layout>{page}</Layout>;
};

export default Page;
