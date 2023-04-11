import EditPostCard from "../../../../components/EditPostCard";

export default function Page({ params }) {
  return (
    <>
      <EditPostCard id={params.postId} />
    </>
  );
}
