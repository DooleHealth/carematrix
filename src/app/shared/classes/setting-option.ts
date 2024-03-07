export enum SettingOptNotification{
    //ADVICES
    ADVICES_APP = "advicesNotificationApp",
    ADVICES_MAIL = "advicesNotificationMail",
    ADVICES_OLD = "advicesNotificaton",
    //AGENDA
    AGENDA_APP = "agendaNotificationApp",
    AGENDA_MAIL = "agendaNotificationMail",
    APPOINTMENT_APP = "appointmentNotificationApp",
    APPOINTMENT_MAIL = "appointmentNotificationMail",
    APPOINTMENT_OLD = "appointmentNotificaton",
    //COMMUNICATIONS
    COMMUNICATIONS_APP = "communicationsNotificationApp",
    COMMUNICATIONS_MAIL = "communicationsNotificationMail",
    COMMUNICATIONS_OLD = "communicationsNotificaton",
    //DIETS
    DIETS_APP = "dietsNotificationApp",
    DIETS_MAIL = "dietsNotificationMail",
    DIETS_OLD = "dietsNotificaton",
    //DRUG-MEDICATION
    DRUG_INTAKE_APP = "drugIntakeNotificationApp",
    DRUG_INTAKE_MAIL = "drugIntakeNotificationMail",
    MEDICATION_PLAN_APP = "medicationPlanExpiredNotificationApp",
    MEDICATION_PLAN_MAIL = "medicationPlanExpiredNotificationEmail",
    //EXERCISE
    EXERCISE_APP = "exercisePlayNotificationApp",
    EXERCISE_MAIL = "exercisePlayNotificationMail",
    //FORM
    FORM_APP ="formNotificationApp",
    FORM_MAIL = "formNotificationMail",
    FORM_OLD = "formNotificaton",
    //GAME
    GAME_APP = "gamePlayNotificationApp",
    GAME_MAIL = "gamePlayNotificationMail",
    //GOALS
    GOALS_APP = "goalsNotificationApp",
    GOALS_MAIL = "goalsNotificationMail",
    GOALS_OLD = "goalsNotificaton",
    //MESSAGE
    MESSAGE_APP = "messagesNotificationApp",
    MESSAGE_MAIL = "messagesNotificationMail",
    MESSAGE_OLD ="messagesNotificaton",
    //NEWS
    NEWS_APP = "newsNotificationApp",
    NEWS_MAIL = "newsNotificationMail",
    //OFFERS_APP
    OFFERS_APP = "offersNotificationApp",
    OFFERS_MAIL = "offersNotificationMail",
    OFFERS_OLD = "offersNotificaton",

    //PROMOTE-CONTENT
    PROMOTE_CONTENT_APP = "promoteContentNotificationApp",
    PROMOTE_CONTENT_MAILL = "promoteContentNotificationMail",
    PROMOTE_CONTENT_OLD =  "promoteContentNotification",
    //REMINDER
    REMINDER_APP ="reminderNotificationApp",
    REMINDER_MAIL ="reminderNotificationMail",
    //TWO-FACTOR
    TWO_FACTOR ="two_factor_authentication"
}

export enum BellOptNotification{
    //ADVICES
    ADVICES_CREATED = "App\\Notifications\\AdviceCreated",
    //AGENDA
    AGENDA_CREATED ="App\\Notifications\\AgendaCreated",
    AGENDA_MOVED = "App\\Notifications\\AgendaMoved",
    AGENDA_REMEMBER = "App\\Notifications\\AgendaRememberNotification",
    //DIETS
    DIETS_CREATED = "App\\Notifications\\DietCreated",
    //DRUG-MEDICATION
    DRUG_INTAKE = "App\\Notifications\\DrugIntakeTime",
    //EXERCISE
    EXERCISE_CREATED = "App\\Notifications\\ExerciseCreated",
    EXERCISE_SCHEDULE = "App\\Notifications\\ExercisePlaySchedule",
    //FORM
    FORM_SCHEDULE = "App\\Notifications\\FormAnswerSchedule",
    //GAME
    GAME_CREATED = "App\\Notifications\\GameCreated",
    GAME_SCHEDULE = "App\\Notifications\\GamePlaySchedule",
    //GOALS
    GOALS_COMPLETED = "App\\Notifications\\goalCompleted",
    //LEVEL
    LEVEL_ASSIGNED = "App\\Notifications\\Level\\NewLevelAssignedNotification",
    //MESSAGE
    MESSAGE = "App\\Notifications\\MessageNotification",
    //NEWS
    NEWS = "App\\Notifications\\NewsNotification",
    //REMINDER
    REMINDER = "App\\Notifications\\ReminderTime",
    //SHARED_CARE_PLAN
    SHARED_CARE_PLAN_ADD = "App\\Notifications\\SharedCarePlanAddContentNotification",




}