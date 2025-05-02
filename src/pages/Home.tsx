import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import classNames from "classnames";
import { helpOutline } from "ionicons/icons";
import { Menu } from "../components/Menu";
import { AppTitle } from "../data/contants";
import "./Home.css";

const Logo: React.FC = () => {
  return (
    <svg
      className={classNames("logo")}
      width="742px"
      height="622px"
      viewBox="0 0 742 622"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="BibleOverview"
        transform="translate(-882.000000, 13.000000)"
        fill="none"
        fillRule="evenodd"
      >
        <circle id="Oval" strokeWidth="25" cx="1253" cy="200" r="200"></circle>
        <ellipse
          id="Oval"
          strokeWidth="25"
          cx="1252"
          cy="200"
          rx="101"
          ry="200"
        ></ellipse>
        <path d="M1253,0.5 L1253,400" id="Path-2" strokeWidth="25"></path>
        <path d="M1452.5,199 L1053,199" id="Path-2" strokeWidth="25"></path>
        <path
          d="M1086,94 C1124.87831,110 1180.54497,118 1253,118 C1325.45503,118 1381.12169,110 1420,94"
          id="Path-3"
          strokeWidth="25"
        ></path>
        <path
          d="M1086,279 C1124.87831,295 1180.54497,303 1253,303 C1325.45503,303 1381.12169,295 1420,279"
          id="Path-3"
          strokeWidth="25"
          transform="translate(1253.000000, 291.000000) scale(1, -1) translate(-1253.000000, -291.000000) "
        ></path>
        <g
          id="Group"
          strokeWidth="1"
          fillRule="evenodd"
          transform="translate(0.000000, 184.000000)"
        ></g>
        <g
          id="Group"
          strokeWidth="1"
          fillRule="evenodd"
          transform="translate(1253.000000, 446.000000) scale(-1, 1) translate(-1253.000000, -446.000000) translate(895.000000, 296.000000)"
          stroke-linejoin="round"
        >
          <path
            d="M64,164 C116.666667,151.333333 170,152 224,166 C278,180 322.666667,210.666667 358,258 L358,48 C316,30.6666667 277.333333,17.6666667 242,9 C206.666667,0.333333333 168,-1.33333333 126,4 L40,224 C88.6666667,219.333333 139.666667,222.666667 193,234 C224.534835,240.701153 272.467078,257.973662 305,284 C318.333333,294.666667 336,300 358,300"
            id="Path-5"
            strokeWidth="25"
          ></path>
          <polyline
            id="Path-6"
            strokeWidth="25"
            points="110 48 79 48 0 243 305 286"
          ></polyline>
          <path
            d="M382,164 C434.666667,151.333333 488,152 542,166 C596,180 640.666667,210.666667 676,258 L676,48 C634,30.6666667 595.333333,17.6666667 560,9 C524.666667,0.333333333 486,-1.33333333 444,4 L358,224 C406.666667,219.333333 457.666667,222.666667 511,234 C542.534835,240.701153 590.467078,257.973662 623,284 C636.333333,294.666667 654,300 676,300"
            id="Path-5"
            strokeWidth="25"
            transform="translate(517.000000, 150.476190) scale(-1, 1) translate(-517.000000, -150.476190) "
          ></path>
          <polyline
            id="Path-6"
            strokeWidth="25"
            transform="translate(563.500000, 167.000000) scale(-1, 1) translate(-563.500000, -167.000000) "
            points="521 48 490 48 411 243 716 286"
          ></polyline>
        </g>
      </g>
    </svg>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <Menu />
      <IonPage id="home-page" className="ion-page">
        <IonHeader collapse="fade">
          <IonToolbar mode="ios">
            <IonButtons slot="start">
              <IonMenuButton mode="ios" />
            </IonButtons>
            <IonTitle>{AppTitle}</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink={`/help`} mode="ios">
                <IonIcon icon={helpOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>{AppTitle}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonRow className="ion-justify-content-center ion-padding-top">
            <Logo />
          </IonRow>
          <IonRow className="ion-padding">
            <p>Perhaps you've asked these questions…</p>
            <p>
              <em>
                Who am I? What am I here for? Who is God? How can we know him?
              </em>
            </p>
            <p>
              Humanity has always asked these deep questions. And it has sought
              the answers in many places.
            </p>
            <p>
              God himself answers these questions in the Bible. It is a book of
              books. A multitude of genres. Spanning thousands of years. All of
              it telling the true and better story of God's plan of salvation,
              unfolded through history, recorded in the Bible, reveals the
              glorious truth. At its heart is Jesus Christ. Richer and better
              than finding myself at the heart of the story.
            </p>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonButton fill="clear" size="large" routerLink="/studies">
              Begin the story...
            </IonButton>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
