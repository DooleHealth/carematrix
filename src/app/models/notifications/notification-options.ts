export interface notificationOpt {
    translate?: string;
    name?: string;
    type?: string;
    item_expanded?: boolean;
    mail?: any;
    app?: any;
    on_mail?:boolean;
    on_app?: boolean;
}

export enum NotificationsType {
    ADVICES = 'advices',
    AGENDA = 'agenda',
    COMMUNICATIONS = 'communications',
    DIETS = 'diets',
    EXERCISES = 'exercises',
    FORMS = 'forms',
    GAMES = 'games',
    GOALS = 'goals',
    MEDICATIONS = 'medication_plans',
    MESSAGES = 'messages',
    NEWS = 'news',
    OFFERS = 'offers',
    PROMOTE_CONTENT = 'promote-content',
    PROCEDURES = 'medical_procedures',
    REMINDERS = 'reminder',
    //Shared care plan
    MONITORING = 'monitoring', 
    INFORMED_CONSENT = 'informed_consent',
    LIFE_STILE_HABITS = 'life_style_habits',
    SHARED_CARE_PLAN = 'shared_care_plan',
    AddButtonMedicalTest= 'add_document',
    TESTIMONIALS= 'testimonials',
    AddButtonTodayDrug = 'drugs-detail',
}

export enum NotificationsTypeBO {
    ADVICES = "App\\Advice",
    AGENDA = "App\\Agenda",
    CHALLENGE_LEVEL = "App\\LevelAccomplishment",
    DIAGNOSTIC_TEST = "App\\DiagnosticTest",
    DIETS = "App\\Diet",
    DRUG = "App\\DrugIntake",
    EXERCISES = "App\\Exercise",
    FORMS = "App\\FormAnswer",
    GAMES = "App\\Game",
    GAME_PLAY = "App\\GamePlay",
    //GOALS = "App\\Goalable",
    MEDICAL_PROCEDURE = "App\\MedicalProcedure",
    MEDICATIONS = "App\\MedicationPlan",
    MESSAGES = "App\\Message",
    NEWS = "App\\News",
    PROGRAMABLE_PLAY = "App\\ProgramablePlay",
    REMINDERS = "App\\Reminder", 
    REMINDERS_EXECUTION ="App\\ReminderExecution",
    SHARED_CARE_PLAN = "App\\ShareCarePlan"
}

export enum NOTIFICATIONS_TYPE_BO {
    AGENDA = "App\\Notifications\\AgendaCreated",
    APPOINTMENTS_VISIT = "App\\Notifications\\VisitOnlineNotification", 
    ADVICES = "App\\Notifications\\AdviceCreated",
    CHALLENGE_LEVEL = "App\\Notifications\\LevelAccomplishmentCompletedNotification",
    DIETS = "App\\Notifications\\DietCreated",
    DRUG = "App\\Notifications\\DrugIntakeTime",
    EXERCISES = "App\\Notifications\\ExerciseCreated",
    EXERCISES_PLAY = "App\\Notifications\\ExercisePlaySchedule", 
    FORMS = "App\\Notifications\\FormAnswerSchedule",
    GAMES = "App\\Notifications\\GamePlaySchedule",
    MESSAGES = "App\\Notifications\\MessageNotification",
    NEWS = "App\\Notifications\\NewsNotification",
    REMINDERS = "App\\Notifications\\ReminderTime", 
    SHARED_CARE_PLAN = "App\\Notifications\\SharedCarePlanAddContentNotification"
    // MEDICATIONS = "",
    // GOALS =  "",
    // MEDICAL_PROCEDURE = "",
    // DIAGNOSTIC_TEST = "",
    // PROGRAMABLE_PLAY = "",
}

export enum NotificationsTypeColor {
    ADVICES =  '#2356f9',
    AGENDA = '#6950ce',
    CHALLENGE_LEVEL = '#BDC3C7',
    DIAGNOSTIC_TEST = '#1A8E92',
    DIETS = '#E67E22',
    DRUG = '#5AC445',
    EXERCISES = '#f53d3d',
    FORMS = '#2356f9',
    GAMES = '#9B59B6',
    GAME_PLAY = '#9B59B6',
    //GOALS = '#1A8E92',
    MEDICAL_PROCEDURE = '#EC7579',
    MEDICATIONS = '#25CAD0',
    MESSAGES = '#25CAD0',
    NEWS = '#2356f9',
    PROGRAMABLE_PLAY = '#7F8C8D',
    REMINDERS =  '#6950ce', 
    REMINDERS_EXECUTION =  '#6950ce',
    SHARED_CARE_PLAN = '#BA0186'
}


export class NotificationOptions {

    public readonly agenda: any = {type:  NotificationsType.AGENDA, mail: 'agendaNotificationMail', app: 'agendaNotificationApp', old: null};
    public readonly reminder: any = {type:  NotificationsType.REMINDERS, mail: 'reminderNotificationMail', app: 'reminderNotificationApp', old: null};
    public readonly diets: any = {type: NotificationsType.DIETS, mail: 'dietsNotificationMail', app: 'dietsNotificationApp', old: 'dietsNotificaton'};
    public readonly medication: any = {type: NotificationsType.MEDICATIONS, mail: ['drugIntakeNotificationMail', 'medicationPlanExpiredNotificationEmail'], app: ['drugIntakeNotificationApp', 'medicationPlanExpiredNotificationApp'], old: null};
    public readonly goals: any = {type: NotificationsType.GOALS, mail: 'goalsNotificationMail', app: 'goalsNotificationApp', old: 'goalsNotificaton'};
    public readonly advices: any = {type: NotificationsType.ADVICES, mail: 'advicesNotificationMail', app: 'advicesNotificationApp', old: 'advicesNotificaton'};
    public readonly forms: any = {type: NotificationsType.FORMS, mail: 'formNotificationMail', app: 'formNotificationApp', old: 'formNotificaton'};
    public readonly messages: any = {type: NotificationsType.MESSAGES, mail: 'messagesNotificationMail', app: 'messagesNotificationApp', old: 'messagesNotificaton'};
    public readonly news: any = {type: NotificationsType.NEWS, mail: 'newsNotificationMail', app: 'newsNotificationApp', old: null};
    public readonly games: any = {type: NotificationsType.GAMES, mail: 'gamePlayNotificationMail', app: 'gamePlayNotificationApp', old: null};
    public readonly exercises: any = {type: NotificationsType.EXERCISES, mail: 'exercisePlayNotificationMail', app: 'exercisePlayNotificationApp', old: null};

    
    private list_options: notificationOpt[] = [];
    //Aqui se añaden todas las notificaciones que queremos que aparezca en setting.page
    private options = [ this.agenda, this.reminder, this.diets, this.medication, this.goals, this.advices, this.forms, this.messages, this.news, this.games, this.exercises];
    constructor() {
        this.setAllNotifications()
    }

    setAllNotifications(){
        
        const ItembyRole = JSON.parse(localStorage.getItem('showItembyRole'));
        const showItembyRole = Object.keys(ItembyRole); 
        showItembyRole.forEach(element => {
           // resultado = this.options.filter(animal => animal != element);
            for (let index = 0; index < this.options.length; index++){
                if(element === this.options[index].type){
                   // delete(this.options[index])
                    this.options.splice(index, 1);
                    index--;
                }                
            }            
        });

      
        
        this.options.forEach(opt => {
            opt['translate'] = this.setTranslate(opt);
            opt['on_mail'] = false;
            opt['on_app'] = false;
            const notification: notificationOpt = opt
            this.list_options.push(notification)
        })
    }

    getListOptions(){
        return this.list_options
    }

    setTranslate(opt){
        switch (opt?.type) {
            case NotificationsType.COMMUNICATIONS:
                return 'setting.subtitle_communications';
            case NotificationsType.AGENDA:
                return 'setting.subtitle_appointment';
            case NotificationsType.REMINDERS:
                return 'setting.subtitle_reminders';
            case NotificationsType.DIETS:
                return 'setting.subtitle_diets';
            case NotificationsType.MEDICATIONS:
                return 'setting.subtitle_medication';
            case  NotificationsType.GOALS:
                return 'setting.subtitle_goals';
            case  NotificationsType.ADVICES:
                return 'setting.subtitle_advices';     
            case  NotificationsType.NEWS:
                return 'setting.subtitle_release';
            case  NotificationsType.PROCEDURES:
                return 'setting.subtitle_procedure';
            case  NotificationsType.OFFERS:
                return 'setting.subtitle_offers';
            case  NotificationsType.FORMS:
                return 'setting.subtitle_form'; 
            case  NotificationsType.MESSAGES:
                return 'setting.subtitle_messages';
            case  NotificationsType.GAMES:
                return 'setting.subtitle_games';
            case  NotificationsType.PROMOTE_CONTENT: 
                return 'setting.subtitle_release';       //     return 'setting.subtitle_promoteContent';
            case  NotificationsType.EXERCISES:
                return 'setting.subtitle_exercises';
            default:
                return '';
        }
    }

    setAppMailField(list, json){
        list.forEach(opt => {
            opt.on_app = this.isOnApp(opt, json)
            opt.on_mail = this.isOnMail(opt, json)
        })
        return list
    }


    isOnApp(opt, json): boolean{
        if(typeof opt.app === 'string') 
            return json[opt.app] == '1'? true:false
        else
            return json[opt.app[0]] == '1'? true:false
    }

    isOnMail(opt, json): boolean{
        if(typeof opt.mail === 'string') 
            return json[opt.mail] == '1'? true:false
        else
            return json[opt.mail[0]] == '1'? true:false
    }
}