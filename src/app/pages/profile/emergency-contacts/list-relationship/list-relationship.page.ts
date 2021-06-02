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
    //this.getListRelationship()
    this.getEmergencyContact()
  }

  getEmergencyContact(){
    this.contact = history.state.contact;
    console.log('[ListRelationshipPage] getHealthCard()' ,  this.contact); 
    if( this.contact ){
      let newContact = {
        name: this.contact.displayName,
        telephone: this.contact.phoneNumbers[0].number,
        thumbnail: (this.contact.photoThumbnail !== undefined)? this.contact.photoThumbnail:null,
        family_relationship: ''
      }
      this.emergencyContact = newContact
      this.emergencyContact.thumbnail
    }

  }

  getListRelationship(){
    this.dooleService.getAPIfamilyRelationship().subscribe(
      async (res: any) =>{
        console.log('[ListRelationshipPage] getListRelationship()', await res);
        this.listRelationship = res
        this.listRelationshipBackup = this.listRelationship
       },(err) => { 
          console.log('[ListRelationshipPage] getListRelationship() ERROR(' + err.code + '): ' + err.message); 
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
    this.emergencyContact.family_relationship = relationship
  }

}
