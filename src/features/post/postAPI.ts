import { axios } from "../../lib/axios";
import { IPost } from "../../types/post";

type GetUserPostsOptions = {
  userId: number;
};

export const getUserPosts = async (props: GetUserPostsOptions) => {
  const { userId } = props;

  return await axios.get("/posts", {
    params: {
      userId,
    },
  });
};

type EditUserPostOptions = {
  userPost: IPost;
};

export const editUserPost = async (props: EditUserPostOptions) => {
  const { userPost } = props;

  return await axios.patch(`/posts/${userPost.id}`, { ...userPost });
};

type DeleteUserPostOptions = {
  userPostId: number;
};

export const deleteUserPost = async (props: DeleteUserPostOptions) => {
  const { userPostId } = props;

  return await axios.delete(`/posts/${userPostId}`);
};
