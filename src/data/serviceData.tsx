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

export const ServiceIcon: { [key: string]: IconSvgElement } = {
    manuel_therapy: Clapping01Icon,

    clinical_pilates: YogaMatIcon,
    orthopedic_rehabilitation: Yoga03Icon,
    athlete_rehabilitation: Bicycle01Icon,
    personal_exercise: WorkoutWarmUpIcon,
    return_to_sports: WorkoutSquatsIcon,
    posture_analysis: MarketAnalysisIcon,
    recovery: HealthIcon,
};
