import { Schema } from "mongoose";

interface UserPostParams {
  userId: Schema.Types.ObjectId;
}

const UserPosts = ({ userId }: UserPostParams) => {
  return <div></div>;
};

export default UserPosts;
