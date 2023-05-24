import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import PostsList from "../components/PostsList";

function Page() {
  return (
    <>
      <PostForm />
      <PostsList />
    </>
  );
}

Page.getLayout = (page: any) => {
  return <Layout>{page}</Layout>;
};

export default Page;
