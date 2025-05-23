import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewStudy from "./pages/ViewStudy";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import { useLocalStorage } from "usehooks-ts";
import { ShowIntroBlurbStorageKey } from "./components/localStorageKeys";
import AllStudies from "./pages/AllStudies";
import AudioPassage from "./pages/AudioPassage";
import BiblePassage from "./pages/BiblePassage";
import CompletedStudies from "./pages/CompletedStudies";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import ViewTheme from "./pages/ViewTheme";
import ViewTimeline from "./pages/ViewTimeline";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [showIntroBlurb, setShowIntroBlurb] = useLocalStorage<boolean>(
    ShowIntroBlurbStorageKey,
    true
  );

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            {showIntroBlurb ? <Home /> : <Redirect to="/studies" />}
          </Route>
          <Route path="/intro" exact={true}>
            <Home />
          </Route>
          <Route path="/studies" exact={true}>
            <AllStudies />
          </Route>
          <Route path="/study/:slug" exact={true}>
            <ViewStudy />
          </Route>
          <Route path="/study/:slug/timeline" exact={true}>
            <ViewTimeline />
          </Route>
          <Route path="/study/:slug/passage/:index" exact={true}>
            <BiblePassage />
          </Route>
          <Route path="/study/:slug/audio/:index" exact={true}>
            <AudioPassage />
          </Route>
          <Route path="/theme/:name" exact={true}>
            <ViewTheme />
          </Route>
          <Route path="/help" exact={true}>
            <Help />
          </Route>
          <Route path="/completedstudies" exact={true}>
            <CompletedStudies />
          </Route>
          <Route path="/settings" exact={true}>
            <Settings />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
