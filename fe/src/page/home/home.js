import React, { useEffect, useState } from "react";
import { CarouselImg } from "../../components/common/carosel";
import { RoomList } from "../../components/room-service/roomList";
import { BlogList } from "../../components/blog/blogList";
import { RoomService } from "../../services/feService/roomService";
import { ArticleService } from "../../services/feService/articleService";
import { defaultA } from "../../common/constant";

const Home = () => {
  document.title = 'Trang chủ';

  const [rooms, setRooms] = useState([]);
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getRooms();
    getArticles();
    // addPaypalScript();
  }, []);

  const getRooms = async () => {
    const rs = await RoomService.getDataList({ page: 1, page_size: 6, status: 1 });
    if (rs?.status === 200) {
      setRooms(rs?.data?.rooms || [])
    } else {
      setRooms([]);
    }
  };

  const getArticles = async () => {
    const rs = await ArticleService.getDataList({ page: 1, page_size: 4, status: 1 });
    if (rs?.status === 200) {
      setArticle(rs?.data?.articles || [])
    } else {
      setArticle([]);
    }
  };


  return (
    <React.Fragment>
      <div className="hero-wrap" style={{ backgroundImage: `url(${defaultA})`, height: "200px", backgroundSize: "900px 200px" }} >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text d-flex align-item-end justify-content-center">
            <div className="col-md-9 text-center d-flex align-items-end justify-content-center">
              <div className="text">
                <h1 className="mb-4 bread">HomePage</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RoomList data={rooms} isShowLink={true} size={3} />
      {
        article && <BlogList title={'Tin tức'} data={article} isShowLink={true} />
      }
    </React.Fragment>
  );
};

export default Home;
