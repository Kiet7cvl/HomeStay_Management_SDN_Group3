import React, { useEffect, useState } from "react";
import { CarouselImg } from "../../components/common/carosel";
import { RoomList } from "../../components/room-service/roomList";
import { BlogList } from "../../components/blog/blogList";
import { RoomService } from "../../services/feService/roomService";
import { ArticleService } from "../../services/feService/articleService";
import { defaultA } from "../../common/constant";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getConfig } from "../../services/feService/paymentService";

const Home = () => {
  document.title = 'Trang chủ';

  const [rooms, setRooms] = useState([]);
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getRooms();
    getArticles();
    addPaypalScript();
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

  const addPaypalScript = async () => {
    const { data } = await getConfig();
    console.log('PayPal Config:', data);
  };

  const onSuccessPaypal = (details, data) => {
    console.log('PayPal payment successful:', details, data);
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
      <PayPalScriptProvider options={{ clientId: "AU6XB-d0fJsPI1rqbU9W86zh6x5-j1GD_Syih9tlvPm9pC2W2PrWkKh3SgA2XO5HZx62euF-jAPnNHKM" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '0.01'
                }
              }]
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(details => {
              onSuccessPaypal(details, data);
            });
          }}
        />
      </PayPalScriptProvider>
      {
        article && <BlogList title={'Tin tức'} data={article} isShowLink={true} />
      }
    </React.Fragment>
  );
};

export default Home;
