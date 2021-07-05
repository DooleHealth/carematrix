import { Component, OnInit } from '@angular/core';
import { EmergencyContact } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-list-relationship',
  templateUrl: './list-relationship.page.html',
  styleUrls: ['./list-relationship.page.scss'],
})
export class ListRelationshipPage implements OnInit {
  listRelationship = ['Madre', 'Padre', 'Padres', 'Hermano/a', 'Hijo/a', 'Amigo/a', 'Cónyugue',
  'Pareja', 'Compañero de piso', 'Cuidador', 'Tutor', 'Médico', 'Otros']
  contact : any;
  emergencyContact : EmergencyContact
  listRelationshipBackup = []
  constructor(private dooleService: DooleService,) { }

  ngOnInit() {
    this.listRelationshipBackup = this.listRelationship
    //this.getListSocialRelationType()
    this.getEmergencyContact()
  }

  getEmergencyContact(){
    this.contact = history.state.contact;
    console.log('[ListRelationshipPage] getEmergencyContact()' ,  this.contact); 
    if(this.contact){
      let newContact = {
        full_name: this.contact.displayName,
        phone: this.contact.phoneNumbers[0].number,
        thumbnail: (this.contact.photoThumbnail !== undefined)? this.contact.photoThumbnail:null,
        social_relation_type: {}
      }
      this.emergencyContact = newContact
      this.emergencyContact.thumbnail
    }

  }

  getListSocialRelationType(){
    this.dooleService.getAPISocialRelationType().subscribe(
      async (res: any) =>{
        console.log('[ListRelationshipPage] getListSocialRelationType()', await res);
        if(res.success){
          this.listRelationship = res.socialRelationTypes
          this.listRelationshipBackup = this.listRelationship
        }
       },(err) => { 
          console.log('[ListRelationshipPage] getListSocialRelationType() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  async filterList(evt) {
    console.log('[ListRelationshipPage] filterList()');
    this.listRelationship = this.listRelationshipBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.listRelationship = this.listRelationship.filter(currentContacts => {
      if (currentContacts && searchTerm) {
        return (currentContacts.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  getDataContact(relationship){
    console.log(`[ListRelationshipPage] getDataContact(${relationship})`);
    this.emergencyContact.socialRelationType = relationship
  }

}
