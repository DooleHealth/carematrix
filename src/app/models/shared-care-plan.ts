export interface SharedCarePlan {
    icon: string;
    title: string;
    description: string;
    type: string;
    state?: string;
}

export interface SharedCarePlanGoal extends SharedCarePlan  {
    id: number;
    date: string;
    percentage: string
}
