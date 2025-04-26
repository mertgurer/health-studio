import { ReactElement } from "react";
import { IconSvgElement } from "@hugeicons/react";
import {
    Clapping01Icon,
    Yoga03Icon,
    YogaMatIcon,
    Bicycle01Icon,
    WorkoutWarmUpIcon,
    HealthIcon,
    WorkoutSquatsIcon,
    MarketAnalysisIcon,
} from "@hugeicons/core-free-icons";
import { StaticImageData } from "next/image";

import ManuelTherapyImage from "../../public/assets/images/MANUEL TERAPİ.jpg";
import ClinicalPilatesImage from "../../public/assets/images/KLİNİK PİLATES.jpg";
import OrthopedicRehabilitationImage from "../../public/assets/images/ORTOPEDİK REHABİLİTASYON.jpg";
import AthleteRehabilitationImage from "../../public/assets/images/SPORCU REHABİLİTASYONU.jpg";
import PersonalExerciseImage from "../../public/assets/images/BİREYSEL EGZERSİZ.jpg";
import ReturnToSportsImage from "../../public/assets/images/SPORA DÖNÜŞ.jpg";
import PostureAnalysisImage from "../../public/assets/images/POSTÜR ANALİZİ.jpg";
import RecoveryImage from "../../public/assets/images/RECOVERY.jpg";

interface ServiceData {
    image: StaticImageData;
    icon: IconSvgElement;
}

export const ServiceData: { [key: string]: ServiceData } = {
    manuel_therapy: {
        image: ManuelTherapyImage,
        icon: Clapping01Icon,
    },
    clinical_pilates: {
        image: ClinicalPilatesImage,
        icon: YogaMatIcon,
    },
    orthopedic_rehabilitation: {
        image: OrthopedicRehabilitationImage,
        icon: Yoga03Icon,
    },
    athlete_rehabilitation: {
        image: AthleteRehabilitationImage,
        icon: Bicycle01Icon,
    },
    personal_exercise: {
        image: PersonalExerciseImage,
        icon: WorkoutWarmUpIcon,
    },
    return_to_sports: {
        image: ReturnToSportsImage,
        icon: WorkoutSquatsIcon,
    },
    posture_analysis: {
        image: PostureAnalysisImage,
        icon: MarketAnalysisIcon,
    },
    recovery: {
        image: RecoveryImage,
        icon: HealthIcon,
    },
};
