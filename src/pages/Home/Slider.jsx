// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Parallax, Pagination, Navigation } from "swiper/modules";

import backgroundImage from "./../../assets/image/cloudy-sky-beautiful-rainforest-lake.jpg";

const styles = {
  swiper: {
    width: "100%",
    height: "90vh",
    background: "#000",
  },
  swiperSlide: {
    fontSize: "18px",
    color: "#fff",
    boxSizing: "border-box",
    padding: "40px 60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  parallaxBg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "130%",
    height: "90vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    fontSize: "41px",
    fontWeight: 300,
  },
  subtitle: {
    fontSize: "21px",
  },
  text: {
    fontSize: "14px",
    maxWidth: "700px",
    lineHeight: 1.3,
  },
};

const Slider = () => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          height: "90vh",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            ...styles.parallaxBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide style={styles.swiperSlide} className="space-y-4">
          <div
            className="title font-pacifico"
            style={styles.title}
            data-swiper-parallax="-300"
          >
            Unveil Bangladesh: Your Path to Adventure
          </div>
          <div
            className="subtitle"
            style={styles.subtitle}
            data-swiper-parallax="-200"
          >
            Explore the Beauty and Culture of Bangladesh
          </div>
          <div className="text" style={styles.text} data-swiper-parallax="-100">
            <p>
              Discover Bangladesh with our exclusive tours. From vibrant Dhaka
              to serene Sundarbans, each journey blends adventure, culture, and
              natural beauty.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={styles.swiperSlide} className="space-y-4">
          <div
            className="title font-pacifico"
            style={styles.title}
            data-swiper-parallax="-300"
          >
            Meet Our Guides: Your Bangladesh Experts
          </div>
          <div
            className="subtitle"
            style={styles.subtitle}
            data-swiper-parallax="-200"
          >
            Your Personal Guides to Authenticity
          </div>
          <div className="text" style={styles.text} data-swiper-parallax="-100">
            <p>
              Meet our passionate guides ready to reveal Bangladesh's soul.
              Experience genuine connections and hidden gems.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={styles.swiperSlide} className="space-y-4">
          <div
            className="title font-pacifico"
            style={styles.title}
            data-swiper-parallax="-300"
          >
            Discover PeculiarBD
          </div>
          <div
            className="subtitle"
            style={styles.subtitle}
            data-swiper-parallax="-200"
          >
            Authentic Travel Experiences
          </div>
          <div className="text" style={styles.text} data-swiper-parallax="-100">
            <p>
              PeculiarBD offers personalized tours showcasing Bangladesh's
              beauty, culture, and vibrant communities. With our expertise and
              dedication to service, join us for a journey you'll cherish.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
