import PostForm from "../../../../components/PostForm";

export default function Page({ params }) {
  return (
    <>
      <PostForm id={params.postId} />
    </>
  );
}
