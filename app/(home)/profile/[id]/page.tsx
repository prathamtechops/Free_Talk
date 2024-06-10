import UserProfile from "@/components/shared/UserProfile";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { redirect } from "next/navigation";

const Profile = async ({ params }: ParamsProps) => {
  const user = await getUserByClerkId({ clerkId: params.id });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
};

export default Profile;
