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
export class NotificationOptions {
    public readonly advices: any = {type: 'advices',mail: 'advicesNotificationMail', app: 'advicesNotificationApp', old: 'advicesNotificaton'};
    public readonly appointments: any = {type: 'appointments',mail: 'agendaNotificationMail', app: 'agendaNotificationApp', old: null};
    public readonly communications: any = {type: 'communications',mail: 'communicationsNotificationMail', app: 'communicationsNotificationApp', old: 'communicationsNotificaton'};
    public readonly diets: any = {type: 'diets',mail: 'dietsNotificationMail', app: 'dietsNotificationApp', old: 'dietsNotificaton'};
    public readonly exercises: any = {type: 'exercises',mail: 'exercisePlayNotificationMail', app: 'exercisePlayNotificationApp', old: null};
    public readonly forms: any = {type: 'forms',mail: 'formNotificationMail', app: 'formNotificationApp', old: 'formNotificaton'};
    public readonly games: any = {type: 'games',mail: 'gamePlayNotificationMail', app: 'gamePlayNotificationApp', old: null};
    public readonly goals: any = {type: 'goals',mail: 'goalsNotificationMail', app: 'goalsNotificationApp', old: 'goalsNotificaton'};  
    public readonly medication: any = {type: 'medication',mail: ['drugIntakeNotificationMail', 'medicationPlanExpiredNotificationEmail'], app: ['drugIntakeNotificationApp', 'medicationPlanExpiredNotificationApp'], old: null};
    public readonly messages: any = {type: 'messages',mail: 'messagesNotificationMail', app: 'messagesNotificationApp', old: 'messagesNotificaton'};
    public readonly news: any = {type: 'news',mail: 'newsNotificationMail', app: 'newsNotificationApp', old: null};
    public readonly offers: any = {type: 'offers',mail: 'offersNotificationMail', app: 'offersNotificationApp', old: 'offersNotificaton'};
    public readonly procedures: any = {type: 'procedures',mail: 'medicalProcedureReminderNotificationMail', app: 'medicalProcedureReminderNotificationApp', old: null};
    public readonly promoteContent: any = {type: 'promoteContent',mail: 'promoteContentNotificationMail', app: 'promoteContentNotificationApp', old: 'promoteContentNotification'};
    public readonly reminder: any = {type: 'reminder',mail: 'reminderNotificationMail', app: 'reminderNotificationApp', old: null};
    
    private list_options: notificationOpt[] = [];
    //Aqui se añaden todas las notificaciones que queremos que aparezca en setting.page
    private options = [this.communications, this.appointments, this.reminder, this.diets, this.medication, this.goals,
                        this.advices, this.news, this.procedures, this.forms, this.messages, this.games];
    constructor() {
        this.setAllNotifications()
    }

    setAllNotifications(){
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
            case 'communications':
                return 'setting.subtitle_communications';
            case 'appointments':
                return 'setting.subtitle_appointment';
            case 'reminder':
                return 'setting.subtitle_reminders';
            case 'diets':
                return 'setting.subtitle_diets';
            case 'medication':
                return 'setting.subtitle_medication';
            case 'appointments':
                return 'setting.subtitle_appointment';
            case 'goals':
                return 'setting.subtitle_goals';
            case 'advices':
                return 'setting.subtitle_advices';     
            case 'news':
                return 'setting.subtitle_release';
            case 'procedures':
                return 'setting.subtitle_procedure';
            case 'offers':
                return 'setting.subtitle_offers';
            case 'forms':
                return 'setting.subtitle_form'; 
            case 'messages':
                return 'setting.subtitle_messages';
            case 'games':
                return 'setting.subtitle_games';
            case 'promoteContent':  
                return 'setting.subtitle_promoteContent';
            case 'exercises':
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
