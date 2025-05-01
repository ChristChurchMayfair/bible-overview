import { DefaultApi } from "@christchurchmayfair/crossway-esv-api-client";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { pause, play, playSkipBack, playSkipForward } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import "./AudioPassage.css";

function AudioPassage() {
  const [passageReference, setPassageReference] = useState<string>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const params = useParams<{ passage: string }>();

  useIonViewWillEnter(() => {
    setPassageReference(params.passage);
    const crossway = new DefaultApi(undefined, "/esv");
    crossway.v3PassageAudioGet({ q: params.passage }).then((response) => {
      setAudioUrl(response.data.audioUrl);
    });
  });

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <IonPage id="audio-passage-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="ios"
              text="Study"
              defaultHref="/"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{passageReference}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="audio-container">
          <audio ref={audioRef} src={audioUrl} />

          <div
            className="progress-container"
            ref={progressRef}
            onClick={handleProgressClick}
          >
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
            <button
              className="control-button"
              onClick={() =>
                audioRef.current && (audioRef.current.currentTime -= 15)
              }
            >
              <IonIcon icon={playSkipBack} />
            </button>
            <button
              className="control-button play-button"
              onClick={togglePlayPause}
            >
              <IonIcon icon={isPlaying ? pause : play} />
            </button>
            <button
              className="control-button"
              onClick={() =>
                audioRef.current && (audioRef.current.currentTime += 15)
              }
            >
              <IonIcon icon={playSkipForward} />
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AudioPassage;
