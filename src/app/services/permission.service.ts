import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  canViewGoals:boolean = true
  canManageGoals:boolean = true
  canViewForms:boolean = true
  canViewAnswerForms:boolean = true
  canViewExercises:boolean = true
  canViewDiets:boolean = true
  canViewRecipes:boolean = true
  canViewGames:boolean = true
  canViewMonitoring:boolean = true
  canManageMonitoring:boolean = true
  canViewAdvices:boolean = true
  canViewMedicalProcedures:boolean = true
  canViewNews:boolean = true
  canViewTestimonials:boolean = true
  canViewMedicalTests:boolean = true
  canManageMedicalTests:boolean = true
  canViewMedication:boolean = true
  canManageMedication:boolean = true
  canViewMedicationPlans:boolean = true
  canViewEvents:boolean = true
  canManageEvents:boolean = true
  canAccessVideocall:boolean = true
  canManageMessages:boolean = true
  canSeeCenters:boolean = true
  

  constructor() { }

  setPermissions(permissions:any) {
    this.canViewGoals = permissions.includes("canViewGoals") ?  true : false;
    this.canManageGoals = this.canViewGoals && permissions.includes("canManageGoals") ? true : false;
    this.canViewForms = permissions.includes("canViewForms") ? true : false;
    this.canViewAnswerForms = permissions.includes("canViewAnswerForms") ? true : false;
    this.canViewExercises = permissions.includes("canViewExercises") ? true : false;
    this.canViewDiets = permissions.includes("canViewDiets") ? true : false;
    this.canViewRecipes = permissions.includes("canViewRecipes") ? true : false;
    this.canViewGames = permissions.includes("canViewGames") ? true : false;
    console.log(permissions.includes("canViewGames"));
    
    this.canViewMonitoring = permissions.includes("canViewMonitoring") ? true : false;
    this.canManageMonitoring = this.canViewMonitoring && permissions.includes("canManageMonitoring") ? true : false;
    this.canViewAdvices = permissions.includes("canViewAdvices") ? true : false;
    this.canViewMedicalProcedures = permissions.includes("canViewMedicalProcedures") ? true : false;
    this.canViewNews = permissions.includes("canViewNews") ? true : false;
    this.canViewTestimonials = permissions.includes("canViewTestimonials") ? true : false;
    this.canViewMedicalTests = permissions.includes("canViewMedicalTests") ? true : false;
    this.canManageMedicalTests = this.canViewMedicalTests && permissions.includes("canManageMedicalTests") ? true : false;
    this.canViewMedication = permissions.includes("canViewMedication") ? true : false;
    this.canManageMedication = this.canViewMedication && permissions.includes("canManageMedication") ? true : false;
    this.canViewMedicationPlans = permissions.includes("canViewMedicationPlans") ? true : false;
    this.canViewEvents = permissions.includes("canViewEvents") ? true : false;
    this.canManageEvents = this.canViewEvents && permissions.includes("canManageEvents") ? true : false;
    this.canAccessVideocall = this.canViewEvents && permissions.includes("canAccessVideocall") ? true : false;
    this.canManageMessages = permissions.includes("canManageMessages") ? true : false;
    this.canSeeCenters = permissions.includes("canSeeCenters") ? true : false; 
  }

  resetPermissions(){
    this.canViewGoals = true
    this.canManageGoals = true
    this.canViewForms = true
    this.canViewAnswerForms = true
    this.canViewExercises = true
    this.canViewDiets = true
    this.canViewRecipes = true
    this.canViewGames = true
    this.canViewMonitoring = true
    this.canManageMonitoring = true
    this.canViewAdvices = true
    this.canViewMedicalProcedures = true
    this.canViewNews = true
    this.canViewTestimonials = true
    this.canViewMedicalTests = true
    this.canManageMedicalTests = true
    this.canViewMedication = true
    this.canManageMedication = true
    this.canViewMedicationPlans = true
    this.canViewEvents = true
    this.canManageEvents = true
    this.canManageMessages = true
    this.canSeeCenters= true
  }
}
