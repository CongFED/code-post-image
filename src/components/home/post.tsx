import React, { useState } from "react";
import "../../styles/css/home/post.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import api from "../../services/api";
interface PostType {
  id: number;
  caption: string;
  image_key: string;
  created_at: string;
  category: string;
  bookmark: boolean;
}
interface PostProps {
  post: PostType;
  postId: number; // Thêm prop key vào đây
}

const Post: React.FC<PostProps> = ({ post, postId }) => {
  const [isBookMark, setIsBookMark] = useState<boolean>(post.bookmark);
  const handleUpdateBookMark = async () => {
    console.log("Bookmark: ", postId, "trang thai: ", isBookMark);
    console.log("postId: ", postId);

    const updatedBookMarkStatus = !isBookMark; // Trạng thái mới của isBookMark

    // Cập nhật state ngay lập tức
    setIsBookMark(updatedBookMarkStatus);
    console.log("kdl: ", typeof postId);
    try {
      // Gọi API tương ứng dựa trên trạng thái mới của isBookMark
      if (updatedBookMarkStatus) {
        const r = await api.get(`/like/${postId}`);
        console.log(r);
      } else {
        await api.delete(`/like/cancle/${postId}`);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      // Nếu có lỗi, đảm bảo cập nhật lại state về trạng thái trước đó
      setIsBookMark((prev) => !prev);
    }
  };
  return (
    <div className="col-lg-4 container-image">
      <figure className="figure-container">
        <img
          className="cover-img"
          src={post.image_key}
          alt={"hi"}
          draggable="false"
        />
        <figcaption className="caption">
          <span className="figure-desc">{post.caption}</span>
          <span>{post.created_at}</span>
        </figcaption>
        <div
          className="figure-icon"
          onClick={handleUpdateBookMark}
          draggable="false"
        >
          {isBookMark ? (
            <FaHeart style={{ width: "34px", height: "30px", color: "red" }} />
          ) : (
            <FaRegHeart style={{ width: "34px", height: "30px" }} />
          )}
        </div>
      </figure>
    </div>
  );
};

export default Post;
