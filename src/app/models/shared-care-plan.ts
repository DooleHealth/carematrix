import { Type } from "@angular/core";
import { NotificationsType } from "./notifications/notification-options";

export enum ContentType {
    ADVICE = "App\\Advice",
    AGENDA = "App\\Agenda",
    DIET = "App\\Diet",
    GAMES =  "App\\Game",
    MEDICATIONS_PLAN = "App\\MedicationPlan",
    MESSAGE = "App\\Message",
    NEW = "App\\News",
    REMINDER = "App\\Reminder",
    EXERCISE = "App\\Exercise",
    PROCEDURE = "App\\MedicalProcedure",
    DIAGNOSTIC_TEST = "App\\DiagnosticTest",
    LEVEL_ACCOMPLISHMENT = "App\\LevelAccomplishment"
}

export enum ContentTypePath {
    //ADVICES
    Advices = '/tracking/advices',
    AdvicesDetail= Advices + '/advices-detail',
    //AGENDA
    Agenda = '/agenda',
    AgendaDetail = '/agenda/detail',
    //CHALLENGES
    Challenges = '/home/health-path',
    ChallengesDetail = '/home/health-path/detail',
    //DIETS 
    Diets= '/tracking/journal', 
    DietsDetail= Diets + '/diets-detail',
    //EXERCISE
    Exercises= '/tracking/exercices', 
    ExercisesDetail = Exercises + '/exercices-detail',
    //FORM
    Forms= '/tracking/form-list', 
    FormDetail = '/tracking/form',
    //GAME   
    Games= '/tracking/games', 
    GamesDetail = Games + '/games-detail',
    //GOALS    
    Goals = '/tracking/profile/goals',
    //HOME
    Home = '/home',
    //LIFESTYLEHABITS
    LifestyleHabits = '/tracking/lifestyle-habits',
    //MEDICAL PROCEDURES
    MedicalProcedure= '/tracking/procedures', 
    //MEDICAL TEST
    MedicalTest= '/document-detail', 
    //MEDICATION
    Medication= '/tracking/medication/', 
    MedicationDetail = '/drugs-detail', // Medication Plan
    //MESSAGE
    Message = '/contact/chat/conversation',
    //MONITORING
    Monitoring= '/tracking/monitoring', 
    //NEWS
    News = '/tracking/news',
    NewsDetail = News + '/new-detail',
    //REMINDERS
    ReminderDetail = '/agenda/reminder',
    //TESTIMONIALS
    Testimonials= '/tracking/testimonials',
    //TRACKING OR FOLLOW UP
    Tracking= '/tracking',
    //INFORMED COSENT
    InformedConsent = '/tracking/informed-consent', 

}

export enum ContentTypeIcons {
    Goals = 'assets/images/shared-care-plan/goals.png',
    LifestyleHabits = 'assets/images/shared-care-plan/lifestyle.png',
    Forms = 'assets/images/shared-care-plan/forms.png',
    Medication = 'assets/images/shared-care-plan/medication.png',
    MedicalProcedure = 'assets/images/shared-care-plan/medicalProcedure.png',
    Monitoring = 'assets/images/shared-care-plan/healthcharts.png',
   
    InformedConsent = 'assets/images/shared-care-plan/news.png',
    // LifeStyle
    News =  'assets/images/shared-care-plan/news.png',
    Advices = 'assets/images/shared-care-plan/advices.png',
    Exercises= 'assets/images/shared-care-plan/exercises.png',
    Diets= 'assets/images/shared-care-plan/diets.png',  
    Testimonials= 'assets/images/shared-care-plan/testimonials.png', 
    Games= 'assets/images/shared-care-plan/games.png',  

    //AddBUtton
    buttonMeditalTest= 'assets/images/shared-care-plan/flask.svg',
    buttomTodayDrug = 'assets/images/shared-care-plan/drug.svg',
    buttomHealthCharts = 'assets/images/shared-care-plan/medical.svg'
}

export enum ContentTypeTranslatedName {
    Goals = 'goals.goals',
    LifestyleHabits = 'lifestyle.header',
    Medication = 'setting.subtitle_medication',
    Forms = 'setting.subtitle_form',
    Monitoring = 'shared_care_plan.monitoring',
    MedicalProcedure = 'shared_care_plan.medical_procedure',
    InformedConsent = 'shared_care_plan.informed_consent',
    // LifeStyle
    News = 'setting.subtitle_news',
    Advices = 'setting.subtitle_advices',
    Exercises= 'exercices.header', 
    Diets= 'setting.subtitle_diets', 
    Testimonials= 'setting.testimonials',
    Games= 'setting.subtitle_games', 
   

    //AddButtons
    addButtonMeditaltest = 'shared_care_plan.addButton.MedicalTest',
    addButtonTodayDrug= 'shared_care_plan.addButton.Medication',
    addButtonHealthCharts= 'shared_care_plan.addButton.HealthCharts',
    

}

declare const enum ContentTypeDescription {
    descriptionGL = 'shared_care_plan.descriptionGL',
    descriptionForms= 'shared_care_plan.descriptionForms',
    descriptionMMpHc= 'shared_care_plan.descriptionMMpHc',
}

export interface ContentComponent {
    img?: string;
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
    [x: string]: any;
    [id: number]: SharedCarePlan
}

export const ListContentType: SCPContentType = [
    {img: ContentTypeIcons.Goals, icon: ContentTypeIcons.Goals, title: ContentTypeTranslatedName.Goals, description: ContentTypeDescription.descriptionGL, type: NotificationsType.GOALS, state: '', boolean_state: false, routerlink: ContentTypePath.Goals},
    {img: ContentTypeIcons.LifestyleHabits, icon: ContentTypeIcons.LifestyleHabits, title: ContentTypeTranslatedName.LifestyleHabits, description: ContentTypeDescription.descriptionGL, type: NotificationsType.LIFE_STILE_HABITS, state: '', boolean_state: false, routerlink: ContentTypePath.LifestyleHabits},
    {img: ContentTypeIcons.Forms, icon: ContentTypeIcons.Forms, title: ContentTypeTranslatedName.Forms, description: ContentTypeDescription.descriptionForms, type: NotificationsType.FORMS, state: '', boolean_state: false, routerlink: ContentTypePath.Forms},
    {img: ContentTypeIcons.Medication, icon: ContentTypeIcons.Medication, title:ContentTypeTranslatedName.Medication, description: ContentTypeDescription.descriptionMMpHc, type: NotificationsType.MEDICATIONS, state: '', boolean_state: false, routerlink: ContentTypePath.Medication},
    {img: ContentTypeIcons.MedicalProcedure, icon: ContentTypeIcons.MedicalProcedure, title: ContentTypeTranslatedName.MedicalProcedure, description: ContentTypeDescription.descriptionMMpHc, type: NotificationsType.PROCEDURES, state: '', boolean_state: false, routerlink: ContentTypePath.MedicalProcedure},
    {img: ContentTypeIcons.Monitoring, icon: ContentTypeIcons.Monitoring, title: ContentTypeTranslatedName.Monitoring, description: ContentTypeDescription.descriptionMMpHc, type: NotificationsType.MONITORING, state: '', boolean_state: false, routerlink: ContentTypePath.Monitoring},
   //{icon: ContentTypeIcons.InformedConsent, title: ContentTypeTranslatedName.InformedConsent, description: ContentTypeDescription.Description, type: NotificationsType.INFORMED_CONSENT, state: '', boolean_state: false, routerlink: ContentTypePath.InformedConsent}
]

export function setStatusContentType(status, content:SharedCarePlan){
    
    let option = content.type
    switch (option) {
        case NotificationsType.GOALS:
            content.boolean_state = status[NotificationsType.GOALS]
            break;
        case NotificationsType.LIFE_STILE_HABITS:
            content.boolean_state = status[NotificationsType.LIFE_STILE_HABITS]
            break;
        case NotificationsType.MEDICATIONS:
            content.boolean_state = status[NotificationsType.MEDICATIONS]
            break;
        case NotificationsType.FORMS:
            content.boolean_state = status[NotificationsType.FORMS]
            break;
        case NotificationsType.MONITORING:
            content.boolean_state = status[NotificationsType.MONITORING]
            break;
        case NotificationsType.PROCEDURES:
            content.boolean_state = status[NotificationsType.PROCEDURES]
            break;
        default:
            break;
    }
}

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
    PENDING = 'pending',
    DECLINED = 'declined',
    ACCEPTED = 'accepted'
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
            case GoalStateType.ACCEPTED || GoalStateType.APPROVED:
                this.name = GoalStateName.APPROVED
                this.color = GoalStateColor.APPROVED
                this.icon = GoalStateIcons.APPROVED
                break;
            case GoalStateType.DECLINED ||  GoalStateType.REJECTED:
                this.name = GoalStateName.REJECTED
                this.color = GoalStateColor.REJECTED
                this.icon = GoalStateIcons.REJECTED
                break;
            default:
                this.name = GoalStateName.PENDING
                this.color = GoalStateColor.PENDING
                this.icon = GoalStateIcons.PENDING
                this.state = GoalStateType.PENDING
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

export const ListSCPLifeStyle: SharedCarePlanLifeStyle [] = [
    {img: ContentTypeIcons.News, title: ContentTypeTranslatedName.News,  type: NotificationsType.NEWS, id:"", traduction: ""},
    {img: ContentTypeIcons.Advices, title: ContentTypeTranslatedName.Advices,  type: NotificationsType.ADVICES, id:"", traduction: ""},
    {img: ContentTypeIcons.Exercises, title: ContentTypeTranslatedName.Exercises,  type:NotificationsType.EXERCISES, id:"", traduction: ""},
    {img: ContentTypeIcons.Diets, title: ContentTypeTranslatedName.Diets,  type:NotificationsType.DIETS, id:"", traduction: ""},
    {img: ContentTypeIcons.Testimonials, title: ContentTypeTranslatedName.Testimonials,  type:NotificationsType.TESTIMONIALS, id:"", traduction: ""},
    {img: ContentTypeIcons.Games, title: ContentTypeTranslatedName.Games,  type:NotificationsType.GAMES, id:"", traduction: ""},
   
]

export interface SharedCarePlanLifeStyle {
    img?: string,
    textHeader?: string,
    title: string,
    description?: string;
    type: string,
    id?: string | number;
    routerlink?: string | any;
    state?: string;
    accepted?: boolean;
    traduction?:string;
    frequency?: string;
    isAnswers?: string;
    hasFormAnswered?: string;
    score?: string;

}

export interface medication extends SharedCarePlanLifeStyle{
    from? : string,
    to?: string
    accepted?: boolean
    model_id?: string,
    model?: string,
    form_id?: string,
    showAlert?: boolean,
    lastdata?: string,
    date?: string,
    canViewFormAnswered?: string,
}

export enum ACCESS_TYPE {
    IFRAME = 'iframe',
    APP = 'app',
    WINDOW = 'windows-app'
}

export interface SharedCarePlanPrescribedApps {
    id?: number,
    icon:string,
    title: string,
    description: string,
    instructions?:string
    iframe_url:string;
    id_pkg?: string;
    access_type?: string;
    configurations?: any;
}

/**
 * Medical Procedure of Shared care Plan
 */
export interface SharedCarePlanProcedure extends SharedCarePlan {
    id?: string | number;
    date: string;
    staff?: string | any;
    department?: string
    img?: string;
    description?: string;
}

/**Medical test of Shared care Plan */
export interface AddButtonComponent {
    id?: string | number;
    title: string;
    icon?: string;
    type?: string;
}

export const AddButtonList: AddButtonComponent [] = [
    {icon: ContentTypeIcons.buttonMeditalTest, title: ContentTypeTranslatedName.addButtonMeditaltest,  type: NotificationsType.AddButtonMedicalTest, id:""},
    {icon: ContentTypeIcons.buttomTodayDrug, title: ContentTypeTranslatedName.addButtonTodayDrug,  type: NotificationsType.AddButtonTodayDrug, id:""},
    {icon: ContentTypeIcons.buttomHealthCharts, title: ContentTypeTranslatedName.addButtonHealthCharts,  type: NotificationsType.AddButtonHealthCharts, id:""},
  
    // {icon: ContentTypeIcons.Exercises, title: ContentTypeTranslatedName.Exercises,  type:NotificationsType.EXERCISES, id:""},
   
]