import { NotificationsType } from "../shared/classes/notification-options";

export enum ContentTypePath {
    Goals = '/profile/goals',
    LifestyleHabits = '/lifestyle-habits',
    Medication= '/medication/', //cambiar
    Forms= '/tracking/form-list', //cambiar
    Monitoring= '/tracking/monitoring', //cambiar
    MedicalProcedure= '/tracking/procedures', //cambiar
    InformedConsent = '/tracking/informed-consent'
}

export enum ContentTypeIcons {
    Goals = 'assets/icons/shared-care-plan/scp-goals.svg',
    LifestyleHabits = 'assets/icons/shared-care-plan/scp-lifestyle.svg',
    Medication = 'assets/icons/shared-care-plan/scp-medication.svg',
    Forms = 'assets/icons/shared-care-plan/scp-form.svg',
    Monitoring = 'assets/icons/shared-care-plan/scp-monitoring.svg',
    MedicalProcedure = 'assets/icons/shared-care-plan/scp-medical-procedures.svg',
    InformedConsent = 'assets/icons/shared-care-plan/scp-informed.svg',
}

export enum ContentTypeTranslatedName {
    Goals = 'goals.goals',
    LifestyleHabits = 'lifestyle.header',
    Medication = 'setting.subtitle_medication',
    Forms = 'setting.subtitle_form',
    Monitoring = 'shared_care_plan.monitoring',
    MedicalProcedure = 'shared_care_plan.medical_procedure',
    InformedConsent = 'shared_care_plan.informed_consent',
}

declare const enum ContentTypeDescription {
    Description = 'shared_care_plan.description',
}

export interface ContentComponent {
    icon: string;
    title: string;
    description: string;
    type: string;
    state?: string | boolean;
    routerlink?: string;
}
export interface SharedCarePlan extends ContentComponent {
    booleanState?: boolean;
}

export interface SCPContentType {
    [id: number]: SharedCarePlan
}

export const ListContentType: SCPContentType = [
    {icon: ContentTypeIcons.Goals, title: ContentTypeTranslatedName.Goals, description: ContentTypeDescription.Description, type: NotificationsType.GOALS, state: '', booleanState: false, routerlink: ContentTypePath.Goals},
    {icon: ContentTypeIcons.LifestyleHabits, title: ContentTypeTranslatedName.LifestyleHabits, description: ContentTypeDescription.Description, type: NotificationsType.LIFE_STILE_HABITS, state: '', booleanState: false, routerlink: ContentTypePath.LifestyleHabits},
    {icon: ContentTypeIcons.Medication, title:ContentTypeTranslatedName.Medication, description: ContentTypeDescription.Description, type: NotificationsType.MEDICATIONS, state: '', booleanState: false, routerlink: ContentTypePath.Medication},
    {icon: ContentTypeIcons.Forms, title: ContentTypeTranslatedName.Forms, description: ContentTypeDescription.Description, type: NotificationsType.FORMS, state: '', booleanState: false, routerlink: ContentTypePath.Forms},
    {icon: ContentTypeIcons.Monitoring, title: ContentTypeTranslatedName.Monitoring, description: ContentTypeDescription.Description, type: NotificationsType.MONITORING, state: '', booleanState: false, routerlink: ContentTypePath.Monitoring},
    {icon: ContentTypeIcons.MedicalProcedure, title: ContentTypeTranslatedName.MedicalProcedure, description: ContentTypeDescription.Description, type: NotificationsType.PROCEDURES, state: '', booleanState: false, routerlink: ContentTypePath.MedicalProcedure},
    {icon: ContentTypeIcons.InformedConsent, title: ContentTypeTranslatedName.InformedConsent, description: ContentTypeDescription.Description, type: NotificationsType.INFORMED_CONSENT, state: '', booleanState: false, routerlink: ContentTypePath.InformedConsent}
]

export interface SharedCarePlanGoal extends SharedCarePlan  {
    id: number;
    date: string;
    percentage: string | number
}
export interface SharedCarePlanLifeStyle {
    img?: string,
    title: string,
    type: string,
    id?: string | number;
    routerlink?: string | Object
}

export interface SharedCarePlanPrescribedApps {
    id?: number,
    icon:string,
    title: string,
    description: string,
    iframe_url:string;
    open_market_app_pkg:string;
}
