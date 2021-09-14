import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  isLoading: boolean;
  id
  recipe
  video: any;
  videoTitle: any;
  videoDescription: any;
  ingredients: any;
  constructor(
    private dooleService: DooleService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.id = history.state?.id;
    if(this.id)
    this.getDetailRecipe()
  }

  async getDetailRecipe(){
    console.log('[RecipePage] getDetailRecipe()');
    this.isLoading = true
    this.dooleService.getAPIdetailRecipe( this.id).subscribe(
      async (json: any) =>{
        console.log('[RecipePage] getDetailRecipe()', await json);

        if(json.success){
          this.recipe=json.receiptIngredients.receipt;
          this.ingredients = json.receiptIngredients.ingredients;

          if(this.recipe.description){
            this.recipe.description=this.recipe.description.replace('"//www.','"https://www.');
            this.recipe.description=this.sanitizer.bypassSecurityTrustHtml(this.recipe.description);
          }

        }
    
        this.isLoading = false
       },(err) => { 
          console.log('[RecipePage] getDetailRecipe() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

}
