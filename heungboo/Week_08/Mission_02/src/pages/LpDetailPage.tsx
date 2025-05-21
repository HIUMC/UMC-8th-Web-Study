import React from "react";
import { useParams } from "react-router-dom";
import AlbumInfo from "../components/Album/AlbumInfo";
import CommentSection from "../components/Comment/CommentSection";

const LpDetailPage: React.FC = () => {
  const { lpId } = useParams<{ lpId: string }>();

  if (!lpId) return <div>Invalid LP ID</div>;

  return (
    <div className="flex flex-col items-center mt-10">
      <AlbumInfo lpId={Number(lpId)} />
      <CommentSection lpId={Number(lpId)} />
    </div>
  );
};

export default LpDetailPage;
