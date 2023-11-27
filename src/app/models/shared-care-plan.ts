export interface SharedCarePlan {
    icon: string;
    title: string;
    description: string;
    type: string;
    state?: string;
    route?: string;
}

export interface SharedCarePlanGoal extends SharedCarePlan  {
    id: number;
    date: string;
    percentage: string
}

enum ContentTypePath {
    Goals,
    LifestyleHabits,
    Medication,
    Forms,
    Monitoring,
    MedicalProcedure,
    InformedConsent,
}

enum ContentTypeIcons {
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

]