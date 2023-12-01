import { Type } from "@angular/core";
import { NotificationsType } from "../shared/classes/notification-options";

export enum ContentType {
    MEDICATIONS_PLAN = "App\\MedicationPlan",
    AGENDA = "App\\Agenda"
}

export enum ContentTypePath {
    Goals = '/profile/goals',
    LifestyleHabits = '/lifestyle-habits',
    Medication= '/medication/', 
    Forms= '/tracking/form-list', 
    Monitoring= '/tracking/monitoring', 
    MedicalProcedure= '/tracking/procedures', 
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
    icon?: string;
    title: string;
    description?: string;
    type: string;
    state?: string | boolean;
    routerlink?: string | any
}
export interface SharedCarePlan extends ContentComponent {
    boolean_state?: boolean;
}

export interface SCPContentType {
    [id: number]: SharedCarePlan
}

export const ListContentType: SCPContentType = [
    {icon: ContentTypeIcons.Goals, title: ContentTypeTranslatedName.Goals, description: ContentTypeDescription.Description, type: NotificationsType.GOALS, state: '', boolean_state: false, routerlink: ContentTypePath.Goals},
    {icon: ContentTypeIcons.LifestyleHabits, title: ContentTypeTranslatedName.LifestyleHabits, description: ContentTypeDescription.Description, type: NotificationsType.LIFE_STILE_HABITS, state: '', boolean_state: false, routerlink: ContentTypePath.LifestyleHabits},
    {icon: ContentTypeIcons.Medication, title:ContentTypeTranslatedName.Medication, description: ContentTypeDescription.Description, type: NotificationsType.MEDICATIONS, state: '', boolean_state: false, routerlink: ContentTypePath.Medication},
    {icon: ContentTypeIcons.Forms, title: ContentTypeTranslatedName.Forms, description: ContentTypeDescription.Description, type: NotificationsType.FORMS, state: '', boolean_state: false, routerlink: ContentTypePath.Forms},
    {icon: ContentTypeIcons.Monitoring, title: ContentTypeTranslatedName.Monitoring, description: ContentTypeDescription.Description, type: NotificationsType.MONITORING, state: '', boolean_state: false, routerlink: ContentTypePath.Monitoring},
    {icon: ContentTypeIcons.MedicalProcedure, title: ContentTypeTranslatedName.MedicalProcedure, description: ContentTypeDescription.Description, type: NotificationsType.PROCEDURES, state: '', boolean_state: false, routerlink: ContentTypePath.MedicalProcedure},
    {icon: ContentTypeIcons.InformedConsent, title: ContentTypeTranslatedName.InformedConsent, description: ContentTypeDescription.Description, type: NotificationsType.INFORMED_CONSENT, state: '', boolean_state: false, routerlink: ContentTypePath.InformedConsent}
]

/**
 * Goals of Shared care Plan
 */

export enum GoalStateName {
    APPROVED = 'shared_care_plan.goal_state.approved',
    REJECTED = 'shared_care_plan.goal_state.rejected',
    PENDING = 'shared_care_plan.goal_state.pending'
}

export enum GoalStateColor {
    APPROVED = '#2ECC71',
    REJECTED = '#E81111',
    PENDING = '#FF8412'
}

export enum GoalStateIcons {
    APPROVED = 'assets/icons/shared-care-plan/approved-icon.svg',
    REJECTED = 'assets/icons/shared-care-plan/rejected-icon.svg',
    PENDING = 'assets/icons/shared-care-plan/pending-icon.svg',
}

export enum GoalStateType {
    APPROVED = 'approved',
    REJECTED = 'rejected',
    PENDING = 'pending'
}

export class GoalState {
    icon: string;
    color: string;
    name: string; 
    state?: string;

    constructor(state){
        this.state = state;
        this.setGoalState(state)
    }

    setGoalState(state){
        switch (state) {
            case GoalStateType.APPROVED:
                this.name = GoalStateName.APPROVED
                this.color = GoalStateColor.APPROVED
                this.icon = GoalStateIcons.APPROVED
                break;
            case GoalStateType.REJECTED:
                this.name = GoalStateName.REJECTED
                this.color = GoalStateColor.REJECTED
                this.icon = GoalStateIcons.REJECTED
                break;
            default:
                this.name = GoalStateName.PENDING
                this.color = GoalStateColor.PENDING
                this.icon = GoalStateIcons.PENDING
                break;
        }
    }
}

export interface SharedCarePlanGoal extends SharedCarePlan  {
    id?: string | number;
    date: string;
    percentage: string | number;
    is_new_content: boolean;
}

/**
 * LifeStyle of Shared care Plan
 */
export interface SharedCarePlanLifeStyle {
    img?: string,
    textHeader?: string,
    title: string,
    description?: string;
    type: string,
    id?: string | number;
    routerlink?: string | any
}

export interface medication extends SharedCarePlanLifeStyle{
    from? : string,
    to?: string
    accepted?: boolean
}

export class LifeStyle implements SharedCarePlanLifeStyle{
    img?: string;
    title: string;
    type: string;
    id?: string | number;
    routerlink?: string | any;  
}

export interface SharedCarePlanPrescribedApps {
    id?: number,
    icon:string,
    title: string,
    description: string,
    iframe_url:string;
    open_market_app_pkg:string;
}