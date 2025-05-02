import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { pause, play, playSkipBack, playSkipForward } from "ionicons/icons";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { getPassagesFromStudy, getStudy } from "../data/studies";
import "./AudioPassage.css";

function AudioPassage() {
  const [passageReference, setPassageReference] = useState<string>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const params = useParams<{ slug: string; index: string }>();

  useIonViewWillEnter(() => {
    const study = getStudy(params.slug);
    const passageIndex = parseInt(params.index) - 1;
    const passages = study ? getPassagesFromStudy(study) : [];
    const passageRef = passages[passageIndex];

    if (passageRef) {
      setPassageReference(passageRef);
      setAudioUrl(
        "https://study.christchurchmayfair.org/esv/v3/passage/audio/?q=" +
          encodeURIComponent(passageRef)
      );
    }
  });

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const skipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 15);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 15);
    }
  };

  return (
    <IonPage id="audio-passage-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="ios"
              text="Study"
              defaultHref={`/study/${params.slug}`}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{passageReference}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {audioUrl ? (
          <div className="audio-container">
            <div className="progress-container" onClick={handleScrub}>
              <div
                className="progress-bar"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="controls">
              <button className="control-button" onClick={skipBack}>
                <IonIcon icon={playSkipBack} />
              </button>
              <button className="control-button" onClick={togglePlay}>
                <IonIcon
                  icon={isPlaying ? pause : play}
                  className="play-button"
                />
              </button>
              <button className="control-button" onClick={skipForward}>
                <IonIcon icon={playSkipForward} />
              </button>
            </div>
            <audio
              ref={audioRef}
              className="audio-player"
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        ) : (
          <div
            className="ion-text-center ion-padding"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonSpinner name="crescent" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default AudioPassage;
