export class MedicationPlanFields {
    field_from_date?: boolean;
    field_to_date?: boolean;
    field_dose?: boolean;
    field_unit?: boolean;
    field_alias?: boolean;
    field_time?: boolean;
    field_day?: boolean;
    field_frequency?: boolean;
    field_frequency_se?: boolean;
    show_field_frequency_se?: boolean;
    isPermitedModify?: boolean;
    isPermitedDelete?: boolean;

    constructor(opt: boolean) {
        this.field_from_date = opt;
        this.field_to_date = opt;
        this.field_dose = opt;
        this.field_unit = opt;
        this.field_alias = opt;
        this.field_time = opt;
        this.field_day = opt;
        this.field_frequency = opt;
        this.field_frequency_se = opt;
        this.show_field_frequency_se = opt;
        this.isPermitedModify = opt;
        this.isPermitedDelete = opt;
    }
}

export class MedicationPlanDrug {
    from_date?: string;
    to_date?: string;
    unit_id?: string;
    alias?: string;
    dose?: string;
    drug?:any;
    time?: any;
    addedByUser?: string;
    frequency?: string;
    // frequencyName?: string;
    // origin?: number;
    day1?: number;
    day2?: number;
    day3?: number;
    day4?: number;
    day5?: number;
    day6?: number;
    day7?: number;
    // isPermitedModify?: boolean;
}

export interface State {
    id?: number,
    name?: string,
    color?: string,
  }

export class MedicationPlan {
        public static readonly SE = 'medicationPlan.SE'
        public static readonly BY_USER = 'BY_USER'
        public static readonly BY_CENTER = 'BY_CENTER'
        public static readonly BY_INT = 'BY_INT'
        public static readonly BY_INT_SE = 'BY_INT_SE'
        public static readonly STATES: State[] = [ 
            {id: 0,name: 'Activo', color: '#42d77d'}, 
            {id: 1,name: 'Vencido', color: '#f8f523'},
            {id: 2,name: 'Suspendido', color: '#3498DB'},
            {id: 3,name: 'Finalizado', color: '#eb445a'},
            {id: 4,name: 'Inactivo', color: '#3498DB'},
          ]
        drug: MedicationPlanDrug
        fields: MedicationPlanFields
        type: string

        constructor(){
            this.fields = new MedicationPlanFields(false)
        }

        //origin: 1 && isPermitedModify: 1 todo editable y eliminar
        //origen 0 && isPermitedModify: 1 solo lectura
        //ES = 1 sólo editar alias, hora y frecuencia
        //ES = 0 sólo editar alias, hora

        setMedicationPlanFields(json): MedicationPlanFields{
            console.log('[MedicationPlan] setMedicationPlanFields()',json);
            if(json?.origin == 1 && json?.isPermitedModify){
                this.type = MedicationPlan.BY_USER
                this.fields = new MedicationPlanFields(true)
                this.fields.show_field_frequency_se = false;
                return this.fields 
            }

            else if(json?.origin == 0 && !json?.isPermitedModify){
                this.type = MedicationPlan.BY_CENTER
                return  this.fields = new MedicationPlanFields(false)
            }

            else if(json?.origin == 0 && json?.isPermitedModify && json?.frequency_se == 1){
                this.type = MedicationPlan.BY_INT_SE
                this.fields.isPermitedModify = true;
                this.fields.field_time = this.setTimeFiled(json?.state_string);
                this.fields.field_alias = true;
                this.fields.field_frequency = true;
                this.fields.field_frequency_se = true;
                this.fields.show_field_frequency_se = true;
                return  this.fields
            }
            else if(json?.origin == 0 && json?.isPermitedModify && json?.frequency_se == 0){
                this.type = MedicationPlan.BY_INT
                this.fields.isPermitedModify = true;
                this.fields.field_time = this.setTimeFiled(json?.state_string);
                this.fields.field_frequency_se = false;
                return  this.fields
            }
            else this.fields
        }

        //If state of medication plan is INACTIVE, it won`t enable time filed
        setTimeFiled(state){
            if(state != MedicationPlan.STATES[4].name) return true
            else return false
        }


        setFieldsByType(){
            if(!this.type)
            return
            switch (this.type) {
                case MedicationPlan.BY_USER:
                    this.fields = new MedicationPlanFields(true)
                    this.fields.show_field_frequency_se = false;
                    break;
                case MedicationPlan.BY_CENTER:
                    this.fields = new MedicationPlanFields(false)
                    break;           
                case MedicationPlan.BY_INT:
                    this.fields.isPermitedModify = true;
                    this.fields.field_time = true;
                    this.fields.field_frequency_se = true;
                    this.fields.show_field_frequency_se = true;
                    break;
                case MedicationPlan.BY_INT_SE:
                    this.fields.isPermitedModify = true;
                    this.fields.field_time = true;
                    this.fields.field_frequency_se = true;
                    break; 
            }
        }


        getKeyFields(){
            if(!this.type)
            return
            switch (this.type) {
                case MedicationPlan.BY_USER:
                    return ['from_date','to_date','unit_id','alias','dose','drug','time','addedByUser','frequency',
                            'day1','day2','day3','day4','day5','day6','day7'];
                case MedicationPlan.BY_CENTER:
                    return []          
                case MedicationPlan.BY_INT:
                    return ['alias','time'];
                case MedicationPlan.BY_INT_SE:
                    return ['alias','frequency','time'];
            }
        }

}
