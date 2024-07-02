import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSuggestedUsers } from "@/lib/actions/recommendation.action";
import { getAuthenticatedUser } from "@/lib/getAuthUser";
import SuggestedUsers from "./SuggestedUsers";

const Suggestions = async () => {
  const { user } = await getAuthenticatedUser();

  const users = await getSuggestedUsers({ userId: user._id });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
      </CardHeader>
      <div className="border-b-2" />
      <CardContent className="flex items-center">
        <SuggestedUsers
          myUser={JSON.parse(JSON.stringify(user))}
          users={JSON.parse(JSON.stringify(users))}
        />
      </CardContent>
    </Card>
  );
};

export default Suggestions;
