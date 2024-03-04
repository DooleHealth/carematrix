import { ContentComponent } from "src/app/components/shared-care-plan/content/content.component";
import { ACCESS_TYPE, ContentType, ContentTypePath, SharedCarePlanGoal, SharedCarePlanLifeStyle, SharedCarePlanPrescribedApps, SharedCarePlanProcedure, medication} from "../shared-care-plan";
import { Platform } from "@ionic/angular";

export class ScpAdapters extends ContentComponent {
    img?: string;
    id?: string | number;
    adapterForView(...args: any[]): void {};
    goTo(type: any): void {}
}

export class LifeStyle extends ScpAdapters {
    title: string;
    type: string;
    routerlink?: string | Object;
    temporaryUrl?: string = "temporaryUrl"
    constructor(type: string, routerlink: string){
        super();
        this.type = type;
        this.routerlink = routerlink;
    }

    /**
   * @public
   * @method adapterForView
   * @param {any[]} list JSON via api
   * @param {string} field1 Image of component
   * @param {string} field2 Title of component
   * @description    Adapta la información que llega via api al componente 
   * @returns {SharedCarePlanLifeStyle[]}
   * @memberof LifestyleIndexComponent
   */

    adapterForView(list: any[], field1: string, field2: string, field3?: string){
        let newList: medication[] = []
            list.forEach((element) => {
                let temporaryUrl;
                if(field3){
                     temporaryUrl = element[field3][field1]
                }else{
                     temporaryUrl = element[field1]
                }
               
                let image = element[field1]
                if(temporaryUrl?.hasOwnProperty(this.temporaryUrl)){
                      image = temporaryUrl.temporaryUrl
                }
                if(field3){
                    let data: medication = {
                        img: image,
                        title: element[field3][field2],
                        type:  this.type,
                        id: element[field3].id,
                        routerlink: this.routerlink,  
                        accepted: this.accepterOrDecline(element.last_accepted_or_declined),
                        state: element?.last_accepted_or_declined?.type, 
                        model: element?.content_type,
                        model_id:  element.id              
                    }                 
                    newList.push(data)
                }else{
                    let data: SharedCarePlanLifeStyle = {
                        img: image,
                        title: element[field2],
                        type:  this.type,
                        id: element?.id,
                        routerlink: this.routerlink,  
                        accepted: this.accepterOrDecline(element.last_accepted_or_declined),
                        state: element?.last_accepted_or_declined?.type                 
                    }                 
                    newList.push(data)
                }
                
            });
            return newList
         
    }

    accepterOrDecline(datos){
        console.log("accepted", datos)
        if(datos === null || datos === undefined){
          return false;
        }else{
          return true;
        }
      }
    
}

export class SharedCarePlanGoals extends ScpAdapters implements SharedCarePlanGoal {
    date: string;
    percentage: string | number;
    state?: string | boolean;
    boolean_state?: boolean;
    icon?: string;
    title: string;
    type: string;
    is_new_content: boolean;
    routerlink?: string;

    constructor(){
        super();
    }

    adapterForView(list: any[], title: string, date: string, type: string, is_new_content: string, aderence?:string, state?:string){
        let newList: SharedCarePlanGoal[] = []
            if(list?.length >0)
            list.forEach((goal) => {
                const percentage = goal?.aderence?.total_percentage;
                const state = goal?.last_accepted_or_declined?.type
                const typeGoal = goal[type]
                const titleGoal = this.getTitle(goal, typeGoal, title); //if it is  MedicationPlan type -> For example:  drug.name
 
                let data: SharedCarePlanGoal = {
                    id: goal?.id,       // id -> id MedicationPlan
                    title: titleGoal,
                    date: goal[date],   //  from_date
                    type: typeGoal,     // "App\\MedicationPlan"
                    state: goal[state]? goal[state]:state,
                    percentage: percentage? percentage:0,
                    is_new_content: goal[is_new_content],
                    routerlink: ContentTypePath.Medication //this.routerlink,
                }                 
                newList.push(data)
            });
            return newList
         
    }

    getTitle(goal:any, type:string, title:string): string {
        let resTitle = ''
        switch (type) {
            case ContentType.MEDICATIONS_PLAN:
                const titleDrug = goal['drug']
                if(titleDrug && titleDrug.hasOwnProperty(title))
                    resTitle = titleDrug[title]
                else
                    console.error(`${ContentType.MEDICATIONS_PLAN} -> drug: Not field ${title}`)

                this.routerlink = ContentTypePath.MedicationDetail
                break;
            case ContentType.ADVICE:
                const titleAdvice = goal['advice']
                if(titleAdvice && titleAdvice.hasOwnProperty(title))
                    resTitle = titleAdvice[title]
                else
                    console.error(`${ContentType.MEDICATIONS_PLAN} -> advice: Not field ${title}`)
                break;
            case ContentType.DIET:
            case ContentType.AGENDA:
            case ContentType.GAMES:
            case ContentType.NEW:
            case ContentType.EXERCISE:
            case ContentType.PROCEDURE:
                //... To be implemented
            default:
                break;
        }
        return resTitle;
    }
    
}

export class MedicalPlanProceduresAdapter extends ScpAdapters implements SharedCarePlanProcedure {
    date: string;
    staff?: string;
    department?: string;
    title: string;
    description?: string;
    type: string;
    temporaryUrl: string = 'thumbnailTemporaryUrl'
    constructor(){
        super();
    }

    adapterForView(list: any[], title: string, date: string, type: string, staff:string, department, img, description: string){
        let newList: SharedCarePlanProcedure[] = []
            if(list?.length >0)
            list.forEach((procedure) => {
                const temporaryUrl = procedure[img]
                this.setStaff(procedure[staff], procedure[department])
                let data: SharedCarePlanProcedure = {
                    id: procedure?.id,       // id -> id procedure
                    title: procedure[title],
                    date: procedure[date],  
                    type: procedure[type],
                    description: procedure[description],      
                    staff: this.staff,  
                    img: procedure.media?.thumbnailTemporaryUrl // temporaryUrl[this.temporaryUrl],
                }                 
                newList.push(data)
            });
            return newList
         
    }

    setStaff(staff, department){
        if(staff?.name)
            this.staff = staff.name
        else if(department?.name)
            this.staff = department?.name
        else
            this.staff = null
    }

}

export class PrescribedAppsAdapter implements SharedCarePlanPrescribedApps {
    id?: number;
    icon: string;
    title: string;
    description: string;
    iframe_url: string;
    id_pkg: string;
    configurations: any;
    access_type: string;

   
    constructor(public platform: Platform){ 
        this.platform = platform;
    }

    adapterForView(list: any[], name: string, cover: string, description: string, instructions : string, url_android: string, url_ios:string, configurations_array){
        let newList: SharedCarePlanPrescribedApps[] = []
            if(list?.length >0)
            list.forEach((app) => {   
                this. configurations = app[configurations_array]
                let data: SharedCarePlanPrescribedApps = {
                    id: app?.id,
                    icon: app[cover],
                    title: app[name],
                    description: app[description],
                    instructions: app[instructions],
                    iframe_url: null,
                    id_pkg: this.platform.is('android') || this.platform.is('mobileweb') ? this.getIdFromUrl(app[url_android], /id=([^&]+)/) : this.getIdFromUrl(app[url_ios], /id(\d+)/),
                    access_type: this.configurations?.access_type,
                    configurations: this.configurations
                }     

            /* if(data?.iframe_url)      */       
                newList.push(data)
             }); 
            return newList
         
    }

    getIdFromUrl(url, regex) {
        if(this.configurations?.access_type === ACCESS_TYPE.APP)
        return url !== null ? url?.match(regex)[1] : null;
    }
}



// const params = new HttpParams().set('user_id', this.authService.user.idUser);
// const urlWithParams = `${this.constants.TRAK_URL}?${params.toString()}`;
// this.safeUrl = urlWithParams

// this.prescribedApps = [
//   {
//     id: 1,
//     icon: 'assets/icons/trak_logo.png',
//     title: 'TRAK',
//     description: 'TRAK App',
//     iframe_url: this.safeUrl,
//     open_market_app_pkg: null,
//   },
//   {
//     id: 2,
//     icon: 'assets/icons/trak_logo.png',
//     title: 'TRAK',
//     description: 'TRAK App',
//     iframe_url: this.safeUrl,
//     open_market_app_pkg: null,
//   },
// ];
// type Class = {
//     new (...args: any[]): unknown
// }

// function getMockDataForClass<T extends Class>(c: T, override: InstanceType<T>){
//     //implementation...
//     if(c === LifeStyle) { return override}
//     if(c === ScpAdapters) { return override}
// }
