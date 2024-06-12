import User, { IUser, UserInterface } from "@/database/user.model";
import { connectToDatabase } from "../mongoConnect";
import { getMutualFollowersCount } from "../utils";
import { GetSuggestedUsers } from "./shared.types";

export async function getSuggestedUsers(params: GetSuggestedUsers) {
  await connectToDatabase();

  const { userId: currentUserId } = params;
  const PAGE_SIZE = 100; // Increase the page size to fetch more users per batch
  const MAX_SUGGESTIONS = 10; // Maximum number of suggested users to return
  let page = 0; // Initialize the page counter
  let hasMoreUsers = true; // Flag to check if there are more users to process
  let suggestedUsers: UserInterface[] = []; // Array to store suggested users

  // Fetch the current user
  const currentUser: IUser | null = await User.findOne({
    clerkId: currentUserId,
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  while (hasMoreUsers && suggestedUsers.length < MAX_SUGGESTIONS) {
    // Fetch a batch of users (excluding the current user and those already followed)
    const usersBatch = await User.find({
      _id: { $ne: currentUser._id },
      followers: { $ne: currentUser._id },
    })
      .skip(page * PAGE_SIZE) // Skip users from previous pages
      .limit(PAGE_SIZE) // Limit the number of users fetched in this batch
      .exec();

    if (usersBatch.length === 0) {
      hasMoreUsers = false; // No more users to fetch
      break;
    }

    // Calculate mutual followers count for each user in the batch
    const usersWithMutualCount = await Promise.all(
      usersBatch.map(async (user) => {
        const mutualCount = await getMutualFollowersCount(
          currentUser._id as string,
          user._id
        );
        return {
          user,
          mutualCount,
        };
      })
    );

    // Sort users in the batch by mutual followers count
    usersWithMutualCount.sort((a, b) => b.mutualCount - a.mutualCount);

    // Add users with mutual followers to the suggested users list
    suggestedUsers = [
      ...suggestedUsers,
      ...usersWithMutualCount
        .filter((u) => u.mutualCount > 0)
        .map((u) => u.user),
    ];

    // Move to the next page
    page += 1;
  }

  // If fewer than MAX_SUGGESTIONS users found, fill with random users
  if (suggestedUsers.length < MAX_SUGGESTIONS) {
    const remainingCount = MAX_SUGGESTIONS - suggestedUsers.length;
    const randomUsers = await User.aggregate([
      { $match: { _id: { $ne: currentUser._id } } },
      { $sample: { size: remainingCount } },
    ]);
    suggestedUsers = [...suggestedUsers, ...randomUsers];
  }

  // Return the final list of suggested users, limited to MAX_SUGGESTIONS
  return suggestedUsers.slice(0, MAX_SUGGESTIONS);
}
