import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
    public sanitizer: DomSanitizer,
    private alertController: AlertController,
    private translate: TranslateService,
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

  async presentFamily(ingredient) {
    if(ingredient.family.length == 0)
    return

    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.titleCaseWord(ingredient.name),
      message: this.translate.instant("recipe.family")+': '+ingredient?.family[0]?.name,
      buttons: [
       {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('Confirm Okay');
            //this.router.navigateByUrl('/profile')
          }
        }
      ]
    });

    await alert.present();
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
