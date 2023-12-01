import { ContentComponent } from "src/app/components/shared-care-plan/content/content.component";
import { SharedCarePlanGoal, SharedCarePlanLifeStyle } from "../shared-care-plan";

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

    adapterForView(list: any[], title: string, date: string, type: string, aderence:string, state:string, is_new_content: string){
        let newList: SharedCarePlanGoal[] = []
            list.forEach((goal) => {
                const titleA = goal[title]
                const percentage = goal[aderence]
                //routerlink: this.routerlink,
                let data: SharedCarePlanGoal = {
                    id: goal?.id, //Esto es el id de plan medicación
                    title: goal[title], //Si es tipo MedicationPlan siempre va a ser drug.name
                    date: goal[date], //Cúal es la fecha
                    type: goal[type], //
                    state: goal[state], //DEbería estar siempre en ingles o un nuúmero
                    percentage: percentage?.total_percentage? percentage.total_percentage:0,

                    is_new_content: goal[is_new_content],
                }                 
                newList.push(data)
            });
            return newList
         
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
