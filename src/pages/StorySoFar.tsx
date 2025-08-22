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
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLocalStorage } from "usehooks-ts";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CompletedStudiesStorageKey } from "../constants/storage";
import { getStudies } from "../data/studies";
import { FullStudy, isFullStudy } from "../data/types";
import { getScheduleStats } from "../data/schedule";

const StorySoFar: React.FC = () => {
  const [studies, setStudies] = useState<FullStudy[]>([]);
  const [totalStudies, setTotalStudies] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedStudies] = useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

  useIonViewWillEnter(() => {
    const allStudies = getStudies().filter(isFullStudy);
    
    setTotalStudies(getScheduleStats().totalStudies);
    
    // Find the highest completed study number, or default to study 1
    const maxCompletedStudy = completedStudies.length > 0 
      ? Math.max(...completedStudies) 
      : 1;
    
    // Show studies up to the max completed study (inclusive)
    const studiesToShow = allStudies.filter(study => study.index <= maxCompletedStudy);
    
    setStudies(studiesToShow);
    setCurrentIndex(0);
  });

  const currentStudy = studies[currentIndex];

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
  };

  if (!currentStudy) {
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton mode="ios" defaultHref="/studies" />
            </IonButtons>
            <IonTitle>The Story So Far</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Complete your first study to begin building your story!</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="ios" defaultHref="/studies" />
          </IonButtons>
          <IonTitle>The Story So Far</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Swiper
          direction="vertical"
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          style={{ height: 'calc(100vh - 120px)' }}
        >
          {studies.map((study) => (
            <SwiperSlide key={study.index}>
              <div className="ion-padding-vertical" style={{ height: '100%', overflowY: 'auto' }}>
                <div style={{ marginBottom: "0.5rem" }}>
                  <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>{study.title}</h2>
                </div>
                {!completedStudies.includes(study.index) && (
                  <small style={{ color: "var(--ion-color-medium)", fontSize: "0.75rem", marginBottom: "1rem", display: "block", opacity: 0.6 }}>
                    Not yet completed
                  </small>
                )}
                
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.summary}</ReactMarkdown>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.4,
          pointerEvents: 'none'
        }}>
          <IonIcon icon={chevronUpOutline} style={{ fontSize: '16px', marginBottom: '2px' }} />
          <IonIcon icon={chevronDownOutline} style={{ fontSize: '16px' }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StorySoFar;