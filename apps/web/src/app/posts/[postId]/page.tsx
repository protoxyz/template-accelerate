import PostCard from "../../../components/PostCard";

export default function Page({ params }) {
  return (
    <>
      <PostCard id={params.postId} />
    </>
  );
}
