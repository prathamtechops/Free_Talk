import { getUserById } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { redirect } from "next/navigation";

const Profile = async ({ params }: ParamsProps) => {
  const user = await getUserById({ id: params.id });

  if (!user) {
    redirect("/sign-in");
  }

  return <div>{user.email}</div>;
};

export default Profile;
