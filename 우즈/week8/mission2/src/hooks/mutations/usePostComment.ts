// src/hooks/mutations/usePostComment.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const postCommentApi = async ({
  lpId,
  content,
  token,
}: {
  lpId: number;
  content: string;
  token: string;
}) => {
  const response = await axios.post(
    `http://localhost:8000/v1/lps/${lpId}/comments`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const usePostComment = () => {
  return useMutation({
    mutationFn: postCommentApi,
  });
};

export default usePostComment;
