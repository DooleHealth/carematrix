import { ContentComponent } from "src/app/components/shared-care-plan/content/content.component";
import { SharedCarePlanLifeStyle } from "../shared-care-plan";

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

    adapterForView(list: any[], field1: string, field2: string){
        let newList: SharedCarePlanLifeStyle[] = []
            list.forEach((element) => {
                const temporaryUrl = element[field1]
                let image = element[field1]
                if(temporaryUrl.hasOwnProperty("temporaryUrl")){
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

// type Class = {
//     new (...args: any[]): unknown
// }

// function getMockDataForClass<T extends Class>(c: T, override: InstanceType<T>){
//     //implementation...
//     if(c === LifeStyle) { return override}
//     if(c === ScpAdapters) { return override}
// }
