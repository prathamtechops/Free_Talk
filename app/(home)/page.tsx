import { HomePostField } from "@/components/home/HomePostField";
import Suggestions from "@/components/home/Suggestions";
import UserFeed from "@/components/home/UserFeed";

const Home = async () => {
  return (
    <div className="grid gap-10  md:grid-cols-3">
      <div className="space-y-4 md:col-span-2">
        {/* Story Session TODO */}
        <HomePostField />
        {/* <PostCard /> */}
        <UserFeed />
      </div>
      <div className="hidden md:block">
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
