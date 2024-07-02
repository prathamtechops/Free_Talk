import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthenticatedUser } from "@/lib/getAuthUser";
import { AvatarInputField } from "./AvatarInputField";

export const HomePostField = async () => {
  const { user } = await getAuthenticatedUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Want to share something?</CardTitle>
      </CardHeader>
      <div className="border-b-2" />
      <CardContent>
        <AvatarInputField
          type="post"
          placeholder="What's on your mind?"
          user={JSON.parse(JSON.stringify(user))}
        />
      </CardContent>
    </Card>
  );
};
