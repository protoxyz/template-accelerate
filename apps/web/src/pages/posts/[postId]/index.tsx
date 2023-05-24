import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import PostCard from "../../../components/PostCard";

function Page({ params }) {
  const router = useRouter();

  return (
    <>
      <PostCard id={router.query.postId as string} />
    </>
  );
}

Page.getLayout = (page: any) => {
  return <Layout>{page}</Layout>;
};

export default Page;
