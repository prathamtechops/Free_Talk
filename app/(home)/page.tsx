import { HomePostField } from "@/components/shared/HomePostField";
import { PostCard } from "@/components/shared/PostCard";

const Home = async () => {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      <div className="space-y-4 md:col-span-2">
        {/* Story Session TODO */}
        <HomePostField user={""} />
        <PostCard />
      </div>
      <div className="hidden md:block">Suggestion</div>
    </div>
  );
};

export default Home;
