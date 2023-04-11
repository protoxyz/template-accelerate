import { router } from "../lib/trpc";
import posts from "./posts";

const appRouter = router({
  posts,
});

export default appRouter;
