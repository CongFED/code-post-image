import React, { useState, useEffect } from "react";
import Post from "../components/home/post";
import "../styles/css/layout/ListPost.css";
import api, { setAuthToken } from "../services/api"; // Đảm bảo rằng đường dẫn đúng
import SearchArea from "../components/home/SearchArea";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
interface PostType {
  id: number;
  caption: string;
  image_key: string;
  created_at: string;
  category: string;
  bookmark: boolean;
}

const ListPost: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [subject, setSubject] = useState<string>("");
  const error = useSelector((state: RootState) => state.searchCate.error);
  const data = useSelector(
    (state: RootState) => state.searchCate.datasearchByCate
  );
  const isFetching = useSelector(
    (state: RootState) => state.searchCate.isFetching
  );

  useEffect(() => {
    if (data != null) {
      console.log(isFetching);
      setPosts(data);
    }
  }, [data, error, isFetching]);
  // const isFetching = useSelector((state: RootState) => state.user.isFetching);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Kiểm tra xem có token trong local storage không

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        console.log(token);
        setAuthToken(token);
        // Gọi API để lấy dữ liệu với token được lưu trong local storage
        const response = await api.get<PostType[]>("/post");

        // Cập nhật state với dữ liệu từ API
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container container-list-post">
      <section>
        <div className="row">
          <div className="col-12">
            <SearchArea />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          {posts.map((post, index) => (
            <Post key={post.id} post={post} postId={post.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ListPost;
