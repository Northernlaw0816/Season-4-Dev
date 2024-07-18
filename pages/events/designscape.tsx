import { NextPage } from "next";
import { useEffect } from "react";
import anime from "animejs";

//components
import HeadTemplate from "../../components/HeadTemplate";
import Layout from "../../components/Layout";
import EventsRegisterButton from "../../components/EventRegisterButton";
import ProfileCard from "../../components/ProfileCard";
//stylesheet
import styles from "../../styles/pages/Events.module.scss";
//data
import DesignscapeData from "../../data/pages/events/designscape";

const Designscape: NextPage = () => {
  useEffect(() => {
    anime.set(
      [
        ".logo_container .hexagon",
        ".logo_container .box",
        ".logo_container .circle",
      ],
      {
        translateX: "50%",
        translateY: "50%",
        opacity: 0,
      }
    );

    anime.set(".logo_container .circle", {
      rx: "0px",
    });

    let timeline = anime.timeline({
      delay: anime.stagger(500),
    });

    anime.set(".ds", {
      translateX: 0,
      translateY: 0,
      scale: 0.75,
    });

    anime.set(".cursor", {
      translateX: 0,
      translateY: 0,
    });

    anime({
      targets: ".selection",
      opacity: 1,
      duration: 0,
    });

    let path = anime.path(".logo_container .ds_path");

    timeline.add({
      targets: ".logo_container .box",
      keyframes: [
        { opacity: 0 },
        { opacity: 0 },
        { opacity: 0 },
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
      ],
      duration: 1000,
    });

    timeline.add({
      targets: ".logo_container .circle",
      keyframes: [
        { opacity: 0 },
        { rotate: 0 },
        { rx: "0px" },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
      ],
    });

    timeline.add({
      targets: ".logo_container .circle",
      keyframes: [{ rotate: 45 }, { rx: "44px" }],
      duration: 1000,
      easing: "easeOutCirc",
    });

    timeline.add({
      targets: ".logo_container .hexagon",
      keyframes: [
        { scale: 0 },
        { rotate: 0 },
        { opacity: 1 },
        { scale: 1 },
        { rotate: 60 },
      ],
      duration: 2000,
      easing: "easeOutBack",
    });

    timeline.add({
      targets: ".ds",
      translateX: path("x"),
      translateY: path("y"),
      scale: 0.74,
      duration: 3000,
      easing: "linear",
    });

    timeline.add({
      targets: ".cursor",
      translateX: 13,
      translateY: 17,
      duration: 500,
      easing: "linear",
    });

    timeline.add({
      targets: ".ds",
      keyframes: [
        { scale: 0.9 },
        { scale: 1.25 },
        { scale: 0.7 },
        { scale: 1 },
      ],
      easing: "linear",
      delay: 100,
      duration: 1500,
    });

    timeline.add({
      targets: ".cursor",
      translateX: "150px",
      keyframes: [
        { translateY: "0px" },
        { translateY: "10px" },
        { translateY: "5px" },
      ],
      delay: 750,
      duration: 1000,
      easing: "easeInOutQuad",
    });

    timeline.add({
      targets: ".selection",
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      duration: 1,
      delay: 100,
      easing: "linear",
    });
  });

  return (
    <>
      <HeadTemplate
        title="NuTopia | Designscape"
        description="NuTopia Events: Designscape"
      />

      <Layout
        skipTo="#tagline"
        overrideClasses={`${styles.main} ${styles.main_ds}`}
      >
        <div className={styles.banner}>
          <div className={styles.logo}>
            {/* <Image src={logo} alt="Arena of Valor" quality={100} placeholder={"blur"}/> */}
            <svg
              viewBox="0 0 256 144"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="logo_container">
                <rect
                  className="box"
                  x="-36.5"
                  y="-36.5"
                  width="73"
                  height="73"
                  stroke="#00CCFF"
                  strokeWidth="2"
                />
                <rect
                  className="circle"
                  x="-44"
                  y="-44"
                  rx="0px"
                  width="88"
                  height="88"
                  stroke="#DB00FF"
                  strokeWidth="2"
                />
                <path
                  className="hexagon"
                  d="M 0 -52.846 l 45.765 26.422 v52.846 l -45.765 26.422 l-45.765 -26.422 v-52.846Z"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  className="ds_path"
                  d="M268.5 -37.5C259.183 -37.5 233.773 -26.7249 224.627 -25.062C223.088 -24.782 221.832 -24.5374 220.342 -23.86C218.085 -22.8339 215.489 -23.321 213.183 -22.5797C210.887 -21.8419 208.427 -19.7153 206.049 -19.4181C203.542 -19.1046 202.12 -16.8395 199.909 -15.7339C197.194 -14.3761 193.701 -13.2363 191.652 -11.1874C189.545 -9.08052 186.526 -5.06528 183.422 -4.28926C182.185 -3.98008 179.568 -2.5523 178.509 -1.7286C177.497 -0.941535 176.134 -0.322206 175.557 0.832062C174.862 2.22092 173.255 4.1871 171.977 5.03886C170.626 5.93937 170.121 8.41939 168.972 9.66373C168.153 10.5509 167.464 12.0119 166.882 13.0605C165.655 15.2696 164.003 16.8336 162.492 18.7567C160.37 21.4578 157.335 22.7122 154.993 25.0538C152.225 27.8214 150.053 31.1457 148.278 34.6955C147.749 35.7533 146.316 40.4333 145.09 40.7836C143.402 41.266 141.884 42.1488 140.073 42.7955C139.02 43.1718 138.247 44.1232 137.251 44.4678C136.414 44.7577 135.479 44.3966 134.638 44.6768C133.25 45.1397 132.426 46.0817 131.033 46.4798C130.464 46.6422 130.094 47.5524 129.569 47.8385C128.322 48.519 126.969 49.0372 125.598 49.3801C123.746 49.8431 122.049 50.7697 120.189 51.183C116.585 51.9839 111.615 52.2444 108.039 51.0524C105.663 50.2604 103.429 45 101 45"
                />
              </g>
              <g className="ds">
                <text
                  id="ds_2"
                  fill="#FF19B1"
                  fontFamily="Geostar Fill"
                  fontSize="30"
                  letterSpacing="0em"
                >
                  <tspan x="1.36719" y="37.94">
                    Ds
                  </tspan>
                </text>
                <rect
                  className="selection box"
                  x="1"
                  y="1"
                  width="53"
                  height="53"
                  stroke="#0047FF"
                />
                <rect
                  className="selection tr"
                  x="53"
                  width="2"
                  height="2"
                  fill="white"
                />
                <rect
                  className="selection br"
                  x="53"
                  y="53"
                  width="2"
                  height="2"
                  fill="white"
                />
                <rect
                  className="selection bl"
                  y="53"
                  width="2"
                  height="2"
                  fill="white"
                />
                <rect
                  className="selection tl"
                  width="2"
                  height="2"
                  fill="white"
                />
                <g className="cursor">
                  <path
                    d="M43.6569 45.3137L40.8284 36.8284L49.3137 39.6569L45.0711 41.0711L43.6569 45.3137Z"
                    fill="white"
                  />
                  <path
                    d="M40.8284 36.8284L40.9865 36.3541C40.8069 36.2942 40.6088 36.341 40.4749 36.4749C40.341 36.6088 40.2942 36.8069 40.3541 36.9865L40.8284 36.8284ZM43.6569 45.3137L43.1825 45.4718C43.2506 45.676 43.4416 45.8137 43.6569 45.8137C43.8721 45.8137 44.0631 45.676 44.1312 45.4718L43.6569 45.3137ZM49.3137 39.6569L49.4718 40.1312C49.676 40.0631 49.8137 39.8721 49.8137 39.6569C49.8137 39.4416 49.676 39.2506 49.4718 39.1825L49.3137 39.6569ZM45.0711 41.0711L44.913 40.5967C44.7637 40.6465 44.6465 40.7637 44.5967 40.913L45.0711 41.0711ZM40.3541 36.9865L43.1825 45.4718L44.1312 45.1556L41.3028 36.6703L40.3541 36.9865ZM49.4718 39.1825L40.9865 36.3541L40.6703 37.3028L49.1556 40.1312L49.4718 39.1825ZM44.1312 45.4718L45.5454 41.2292L44.5967 40.913L43.1825 45.1556L44.1312 45.4718ZM45.2292 41.5454L49.4718 40.1312L49.1556 39.1825L44.913 40.5967L45.2292 41.5454Z"
                    fill="black"
                  />
                </g>
              </g>
            </svg>
          </div>

          <div className={styles.banner_text}>
            <h1 id="title">Designscape</h1>
          </div>
        </div>

        <div className={styles.content}>
          <h2 id="tagline" className={styles.tagline}>
            {DesignscapeData.tagline}
          </h2>
          <div className={styles.bg_blur}>
            <h2 id="about">About</h2>
            <p className={`${styles.h2_p} ${styles.description_p}`}>
              {DesignscapeData.headings.about}
            </p>
          </div>

          <div className={styles.bg_blur}>
            <h2 id="details">Details</h2>
            <p className={styles.h2_p}>
              <strong>Date:</strong> {DesignscapeData.details.date}
            </p>
            <p className={styles.h2_p}>
              <strong>Time:</strong> {DesignscapeData.details.time}
            </p>
            <p className={styles.h2_p}>
              <strong>Venue:</strong> {DesignscapeData.details.venue}
            </p>
          </div>

          <div className={styles.bg_blur}>
            <h2 id="guidelines">Guidelines</h2>
            <ul>
              {DesignscapeData.headings.rules.map((rule, index) => {
                return (
                  <li key={index}>
                    <p>{rule}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.bg_blur_prof}>
            <h2 id="event-coordinators">Event Coordinators</h2>
            <div className={styles.card_container}>
              {DesignscapeData.headings.eventCoordinators.map(
                (coordinator, index) => {
                  return (
                    <ProfileCard key={index} profileObject={coordinator} />
                  );
                }
              )}
            </div>
          </div>
          <div className={styles.bg_blur}>
            <h2 id="registration">Registration</h2>
            <ul>
              {DesignscapeData.headings.registration.map((rule, index) => {
                return (
                  <li key={index}>
                    <p>{rule}</p>
                  </li>
                );
              })}
            </ul>
          </div>
           <div className={styles.register_link_align}>
           <EventsRegisterButton pathname="https://docs.google.com/forms/d/e/1FAIpQLSdworOM4eC18IPgddxiaR1h5ccYV_dsp6BV0pUx1ziP7fA6TQ/viewform" text={`Register for ${DesignscapeData.title}`} />
      </div>
        </div>
      </Layout>
    </>
  );
};

export default Designscape;