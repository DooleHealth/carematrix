import { Component, Input, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-view-more-information',
  templateUrl: './view-more-information.component.html',
  styleUrls: ['./view-more-information.component.scss'],
})
export class ViewMoreInformationComponent implements OnInit {
  @Input() content: any;
  @Input() segment: string;
  like = false;
  hide = false;
  favourite = false;
  toLink;
  constructor(private dooleService: DooleService,) { }

  ngOnInit() {
    console.log("lo que llega", this.content)
    console.log("segment", this.segment)
    //this.toRouterLink()

  }

  toRouterLink() {

    switch (this.segment) {
      case "News":
        return 'new-detail'
          ;
      case "Advices":
        return 'advices-detail'
          ;
      case "Exercises":
        return 'exercices-detail'
          ;

    }

    if (this.content[0].modal_type)
      if (this.content[0].modal_type === "App\\Receipt") {
        return 'diets-detail/recipe';
      }
  }
  setContentStatus(id, type) {
    let iconToShow;
    let value = 0
    
    this.like = !this.like

    iconToShow = this.like ? 'heart' : 'heart-outline'
    value = this.like ? 1 : 0
    
    let params = {
      model: this.segment,
      id: id,
      type: type,
      status: value
    }
    
    this.dooleService.postAPIContentStatus(params).subscribe(
      async (res: any) => {
        if (res.success) {
         
        }
      }
    )




  }

  truncateDescription(description: string, maxLength: number): string {
    // Utiliza una expresión regular para eliminar las etiquetas HTML
    const regex = /(<([^>]+)>)/ig;
    const result = description.replace(regex, "");
    if (result.length > maxLength) {
      return result.substring(0, maxLength) + '...';
    } else {
      return result;
    }
  }

  extractText(htmlContent: string): string {
    // Si el contenido es nulo o indefinido, retorna una cadena vacía
    if (!htmlContent) {
      return '';
    }

    // Utiliza una expresión regular para eliminar las etiquetas HTML
    const regex = /(<([^>]+)>)/ig;
    const result = htmlContent.replace(regex, "");

    return result;
  }

  getImageSource(listcontets): string {
    return listcontets.cover || listcontets.image || '/assets/images/shared-care-plan/image-not-found.png';
  }

  getStateObject(listcontets) {

    if (this.segment === "Exercises") {
      return { id: listcontets?.id, programable_id: listcontets.programable_id };
    } else {
      return { id: listcontets?.id };
    }
  }

  getColorLike(statusable) {
    console.log(statusable)
    if (statusable.length > 0) {
      let existeLike = statusable.some(objeto => objeto.type === "like");
      if (existeLike) {
        return 'heart'
      } else {
        return 'heart-outline'
      }

    }
    else {
      return 'heart-outline'
    }
  }
}
