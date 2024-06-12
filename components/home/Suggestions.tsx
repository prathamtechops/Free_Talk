import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSuggestedUsers } from "@/lib/actions/recommendation.action";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import SuggestedUsers from "./SuggestedUsers";

const Suggestions = async () => {
  const { userId } = auth();

  const [myId, users] = await Promise.all([
    getUserByClerkId({ clerkId: userId }),
    getSuggestedUsers({ userId }),
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
      </CardHeader>
      <div className="border-b-2" />
      <CardContent className="flex items-center">
        <SuggestedUsers
          myUser={JSON.parse(JSON.stringify(myId))}
          users={JSON.parse(JSON.stringify(users))}
        />
      </CardContent>
    </Card>
  );
};

export default Suggestions;
