export interface SharedCarePlan {
    icon: string,
    title: string,
    description: string,
    type: string,
    state: string,
}

export interface SharedCarePlanGoal {
    id?: number,
    date: string,
    title: string,
    description: string,
    state: string,
    icon: string,
    percentage: string
}

export interface SharedCarePlanPrescribedApps {
    id?: number,
    icon:string,
    title: string,
    description: string,
    iframe_url:string;
    open_market_app_pkg:string;
}
