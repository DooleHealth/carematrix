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
    APPOINTMENTS = 'appointments',
    REMINDERS = 'reminder',
    DIETS = 'diets',
    MEDICATIONS = 'medication',
    GOALS = 'goals',
    ADVICES = 'advices',
    FORMS = 'forms',
    MESSAGES = 'messages',
    NEWS = 'news',
    GAMES = 'games',
    EXERCISES = 'exercises',
    COMMUNICATIONS = 'communications',
    PROMOTE_CONTENT = 'promote-content',
    PROCEDURES = 'procedures',
    OFFERS = 'offers',
    LIFE_STILE_HABITS = 'life-style-habits',
    MONITORING = 'monitoring', 
    INFORMED_CONSENT = 'informed-consent'
}

export enum NotificationsTypeBO {
    ADVICES = "App\\Advice",
    APPOINTMENTS = "App\\Agenda",
    REMINDERS = "App\\Reminder", 
    REMINDERS_EXECUTION ="App\\ReminderExecution",
    DIETS = "App\\Diet",
    MEDICATIONS = 'medication',
    CHALLENGE_LEVEL = "App\\LevelAccomplishment",
    DRUG = "App\\DrugIntake",
    GOALS = 'goals',
    FORMS = 'forms',
    MESSAGES = "App\\Message",
    NEWS = "App\\News",
    GAMES = "App\\Game",
    GAME_PLAY = "App\\GamePlay",
    EXERCISES = "App\\Exercise",
    MEDICAL_PROCEDURE = "App\\MedicalProcedure",
    DIAGNOSTIC_TEST = "App\\DiagnosticTest",
    PROGRAMABLE_PLAY = "App\\ProgramablePlay",
}

export enum NOTIFICATIONS_TYPE_BO {
    APPOINTMENTS = "App\\Agenda",
    REMINDERS = "App\\Reminder", 
    REMINDERS_EXECUTION ="App\\ReminderExecution",
    DIETS = "App\\Diet",
    MEDICATIONS = 'medication',

    GOALS = 'goals',
    NEWS = "App\\News",
    GAMES = "App\\Game",
    GAME_PLAY = "App\\GamePlay",
    EXERCISES = "App\\Exercise",
    MEDICAL_PROCEDURE = "App\\MedicalProcedure",
    DIAGNOSTIC_TEST = "App\\DiagnosticTest",
    PROGRAMABLE_PLAY = "App\\ProgramablePlay",

    FORMS = "App\\Notifications\\FormAnswerSchedule",
    CHALLENGE_LEVEL = "App\\Notifications\\LevelAccomplishmentCompletedNotification",
    DRUG = "App\\Notifications\\DrugIntakeTime",
    ADVICES = "App\\Notifications\\VisitOnlineNotification",
    MESSAGES = "App\\Message",
}


export class NotificationOptions {

    public readonly appointments: any = {type:  NotificationsType.APPOINTMENTS, mail: 'agendaNotificationMail', app: 'agendaNotificationApp', old: null};
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
    private options = [ this.appointments, this.reminder, this.diets, this.medication, this.goals, this.advices, this.forms, this.messages, this.news, this.games, this.exercises];
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
            case NotificationsType.APPOINTMENTS:
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