import { HomePostField } from "@/components/home/HomePostField";
import Suggestions from "@/components/home/Suggestions";
import { PostCard } from "@/components/shared/PostCard";

const Home = async () => {
  return (
    <div className="grid gap-10  md:grid-cols-3">
      <div className="space-y-4 md:col-span-2">
        {/* Story Session TODO */}
        <HomePostField />
        <PostCard />
      </div>
      <div className="hidden md:block">
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
