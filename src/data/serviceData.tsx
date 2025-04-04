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

export interface ServiceData {
    title: string;
    info: string;
    description: string;
    image: StaticImageData;
    icon: IconSvgElement;
}

export const services: ServiceData[] = [
    {
        title: "Services.ManuelTherapy.title",
        info: "Services.ManuelTherapy.info",
        description: "Services.ManuelTherapy.description",
        image: ManuelTherapyImage,
        icon: Clapping01Icon,
    },
    {
        title: "Services.ClinicalPilates.title",
        info: "Services.ClinicalPilates.info",
        description: "Services.ClinicalPilates.description",
        image: ClinicalPilatesImage,
        icon: YogaMatIcon,
    },
    {
        title: "Services.OrthopedicRehabilitation.title",
        info: "Services.OrthopedicRehabilitation.info",
        description: "Services.OrthopedicRehabilitation.description",
        image: OrthopedicRehabilitationImage,
        icon: Yoga03Icon,
    },
    {
        title: "Services.AthleteRehabilitation.title",
        info: "Services.AthleteRehabilitation.info",
        description: "Services.AthleteRehabilitation.description",
        image: AthleteRehabilitationImage,
        icon: Bicycle01Icon,
    },
    {
        title: "Services.PersonalExercise.title",
        info: "Services.PersonalExercise.info",
        description: "Services.PersonalExercise.description",
        image: PersonalExerciseImage,
        icon: WorkoutWarmUpIcon,
    },
    {
        title: "Services.ReturnToSports.title",
        info: "Services.ReturnToSports.info",
        description: "Services.ReturnToSports.description",
        image: ReturnToSportsImage,
        icon: WorkoutSquatsIcon,
    },
    {
        title: "Services.PostureAnalysis.title",
        info: "Services.PostureAnalysis.info",
        description: "Services.PostureAnalysis.description",
        image: PostureAnalysisImage,
        icon: MarketAnalysisIcon,
    },
    {
        title: "Services.Recovery.title",
        info: "Services.Recovery.info",
        description: "Services.Recovery.description",
        image: RecoveryImage,
        icon: HealthIcon,
    },
];
