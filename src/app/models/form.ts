export interface SCP_API_Form {
    id:                        number;
    form_id:                   number;
    title:                     string;
    description:               string;
    from_date:                 any;
    to_date:                   any;
    minutes_from:              null;
    minutes_to:                null;
    active:                    number;
    frequency:                 string;
    frequency_modality_asign:  null;
    computed_until:            null;
    computed_until_to_future:  null;
    observations:              null;
    content_type:              string;
    alarms:                    any[];
    formProgrammationTimes:    FormProgrammationTime[];
    hasFormAnswered:           boolean;
    formAnswers:               any[];
    media:                     Media;
    canViewFormAnswered:       boolean;
    last_accepted_or_declined: any;
}

export interface FormProgrammationTime {
    id:                    number;
    form_programmation_id: number;
    time:                  string;
    created_at:            Date;
    updated_at:            Date;
    deleted_at:            null;
    form_answer:           null;
    status:                number;
    status_string:         string;
}

export interface Media {
    id:                    number;
    mediable_type:         string;
    mediable_id:           number;
    collection_name:       string;
    name:                  string;
    description:           null;
    file_name:             string;
    mime_type:             string;
    disk:                  string;
    size:                  number;
    manipulations:         string;
    custom_properties:     string;
    responsive_images:     string;
    order_column:          null;
    created_at:            Date;
    updated_at:            Date;
    deleted_at:            null;
    temporaryUrl:          string;
    thumbnailTemporaryUrl: string;
    createdDiffForHumans:  string;
    size_mb:               number;
}

export class Form {
    time:       string;
    isPending:  boolean;
    form_answer_id : number;

    static list_form_programming: Form[] = []
    static formProgrammation(obj: Object){
        return new Form(
            obj['id'],
            obj['form_id'],
            obj['title'],
            obj['description'],
            obj['from_date'],
            obj['to_date'],
            obj['formProgrammationTimes'],
            obj['hasFormAnswered'],
            obj['formAnswers'],
            obj['media'],
        )
    }

    constructor(
        public id:                        number,
        public form_id:                   number,
        public title:                     string,
        public description:               string,
        public from_date:                 any,
        public to_date:                   any,
        public formProgrammationTimes:    FormProgrammationTime[],
        public hasFormAnswered:           boolean,
        public formAnswers:               any[],
        public media:                     Media,
    ){
    }

    static getFormProgrammationByTimes(forms:Form[]){
        let list:Form[] = []
        forms.forEach( (form:Form)=> {
            list = list.concat(this.getFromTimes(form))
        })
        console.log('[Form] getFormProgrammationByTimes()', list);
        list =  Form.sortFormsByTimes(list)
        console.log('[Form] getFormProgrammationByTimes() 1', list);
        return list
    }

    static getFromTimes(form:Form):Form[]{
        let list:Form[] = []
        form.formProgrammationTimes.forEach( f =>{
            const auxForm = form;
            auxForm.time = Form.getTime(f.time)
            auxForm.isPending = f.status == 2 ? true:false
            list.push(auxForm)
        })
        return list
    }

    static sortFormsByTimes(forms:Form[]):Form[]{
        return forms.sort(function (a, b) {
                if(Form.hourToMinutes(a.time) > Form.hourToMinutes(b.time))
                    return 1
                    if(Form.hourToMinutes(a.time) < Form.hourToMinutes(b.time))
                    return -1
                return 0
            }
        );
    }

    static getTime(time: string){
        const aux = time.split(':')
        return aux[0] + ':' + aux[1]
    }

    static hourToMinutes(hour) {
        let minutes = hour?.split(':')
        return (Number(minutes[0])) * 60 + (Number(minutes[1]))
      }
}
