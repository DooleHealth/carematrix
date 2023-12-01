import { ContentComponent } from "src/app/components/shared-care-plan/content/content.component";
import { ContentType, SharedCarePlanGoal, SharedCarePlanLifeStyle } from "../shared-care-plan";

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

    adapterForView(list: any[], field1: string, field2: string){
        let newList: SharedCarePlanLifeStyle[] = []
            list.forEach((element) => {
                const temporaryUrl = element[field1]
                let image = element[field1]
                if(temporaryUrl?.hasOwnProperty("temporaryUrl")){
                      image = temporaryUrl.temporaryUrl
                }
                let data: SharedCarePlanLifeStyle = {
                    img: image,
                    title: element[field2],
                    type:  this.type,
                    id: element?.id,
                    routerlink: this.routerlink,                  
                }                 
                newList.push(data)
            });
            return newList
         
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
            list.forEach((goal) => {
                const percentage = goal?.aderence?.total_percentage;
                const state = goal?.last_accepted_or_declined?.type
                const typeGoal = goal[type]
                const titleGoal = this.getTitle(goal, typeGoal, title); //if it is  MedicationPlan type -> For example:  drug.name
                //routerlink: this.routerlink,
                let data: SharedCarePlanGoal = {
                    id: goal?.id, // id -> id MedicationPlan
                    title: titleGoal,
                    date: goal[date], //from_date
                    type: typeGoal, // "App\\MedicationPlan"
                    state: goal[state]? goal[state]:state,
                    percentage: percentage? percentage:0,
                    is_new_content: goal[is_new_content],
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


// type Class = {
//     new (...args: any[]): unknown
// }

// function getMockDataForClass<T extends Class>(c: T, override: InstanceType<T>){
//     //implementation...
//     if(c === LifeStyle) { return override}
//     if(c === ScpAdapters) { return override}
// }
