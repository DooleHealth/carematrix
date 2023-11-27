export interface SharedCarePlan {
    icon: string;
    title: string;
    description: string;
    type: string;
    state?: string;
    booleanState?: boolean;
    route?: string;
}

export interface SharedCarePlanGoal extends SharedCarePlan  {
    id: number;
    date: string;
    percentage: string
}

export enum ContentTypePath {
    Goals = '/profile/goals',
    LifestyleHabits = '/profile/goals', //cambiar
    Medication= '/profile/goals', //cambiar
    Forms= '/profile/goals', //cambiar
    Monitoring= '/profile/goals', //cambiar
    MedicalProcedure= '/profile/goals', //cambiar
    InformedConsent = '/tracking/informed-consent'
}

export enum ContentTypeIcons {
    Goals = 'assets/icons/share-care-plan/scp-goals.svg',
    LifestyleHabits = 'assets/icons/share-care-plan/scp-lifestyle.svg',
    Medication = 'assets/icons/share-care-plan/scp-medication.svg',
    Forms = 'assets/icons/share-care-plan/scp-form.svg',
    Monitoring = 'assets/icons/share-care-plan/scp-monitoring.svg',
    MedicalProcedure = 'assets/icons/share-care-plan/scp-medical-procedures.svg',
    InformedConsent = 'assets/icons/share-care-plan/scp-informed.svg',
}

interface SCPContentType {
    [id: number]: SharedCarePlan
}

const ListContentType: SCPContentType = [
    {icon: ContentTypeIcons.Goals, title: '', description: '', type: 'goals', state: '', booleanState: false, route: ContentTypePath.Goals},
    {icon: ContentTypeIcons.LifestyleHabits, title: '', description: '', type: 'lifestyle', state: '', booleanState: false, route: ContentTypePath.LifestyleHabits}
]
export interface SharedCarePlanLifeStyle {
    img?: string,
    title: string,
    description: string,
    type: string
    
}
