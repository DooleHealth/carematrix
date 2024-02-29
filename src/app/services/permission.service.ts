import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  canViewGoals:boolean = false
  canManageGoals:boolean = false
  canViewForms:boolean = false
  canViewAnswerForms:boolean = false
  canViewExercises:boolean = false
  canViewDiets:boolean = false
  canViewRecipes:boolean = false
  canViewGames:boolean = false
  canViewMonitoring:boolean = false
  canManageMonitoring:boolean = false
  canViewAdvices:boolean = false
  canViewMedicalProcedures:boolean = false
  canViewNews:boolean = false
  canViewTestimonials:boolean = false
  canViewMedicalTests:boolean = false
  canManageMedicalTests:boolean = false
  canViewMedication:boolean = false
  canManageMedication:boolean = false
  canViewMedicationPlans:boolean = false
  canViewPlanningForms:boolean = false
  canViewEvents:boolean = false
  canManageEvents:boolean = false
  canManageMessages:boolean = false
  canSeeMedicalVisits:boolean = false
  canManageRequesVisit:boolean = false
  canSeeCenters:boolean = false
  

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
    this.canViewMonitoring = permissions.includes("canViewMonitoring") ? true : false;
    this.canManageMonitoring = this.canViewMonitoring && permissions.includes("canManageMonitoring") ? true : false;
    this.canViewAdvices = permissions.includes("canViewAdvices") ? true : false;
    this.canViewMedicalProcedures = permissions.includes("canViewMedicalProcedures") ? true : false;
    this.canViewNews = permissions.includes("canViewNews") ? true : false;
    this.canViewTestimonials = permissions.includes("canViewTestimonials") ? true : false;
    this.canViewMedicalTests = permissions.includes("canViewMedicalTests") ? true : false;
    this.canManageMedicalTests = this.canViewMedicalTests && permissions.includes("canManageMedicalTests") ? true : false;
    this.canViewMedication = permissions.includes("canViewMedication") ? true : false;
    this.canManageMedication = this.canViewMedication && permissions.includes("canViewMedication") ? true : false;
    this.canViewMedicationPlans = permissions.includes("canViewMedicationPlans") ? true : false;
    this.canViewPlanningForms = permissions.includes("canViewPlanningForms") ? true : false;
    this.canViewEvents = permissions.includes("canViewEvents") ? true : false;
    this.canManageEvents = this.canViewEvents && permissions.includes("canViewEvents") ? true : false;
    this.canManageMessages = permissions.includes("canManageMessages") ? true : false;
    this.canSeeMedicalVisits = permissions.includes("canSeeMedicalVisits") ? true : false;
    this.canManageRequesVisit = this.canSeeMedicalVisits && permissions.includes("canManageRequesVisit") ? true : false;
    this.canSeeCenters = permissions.includes("canSeeCenters") ? true : false; 
  }

  resetPermissions(){
    this.canViewGoals = false
    this.canManageGoals = false
    this.canViewForms = false
    this.canViewAnswerForms = false
    this.canViewExercises = false
    this.canViewDiets = false
    this.canViewRecipes = false
    this.canViewGames = false
    this.canViewMonitoring = false
    this.canManageMonitoring = false
    this.canViewAdvices = false
    this.canViewMedicalProcedures = false
    this.canViewNews = false
    this.canViewTestimonials = false
    this.canViewMedicalTests = false
    this.canManageMedicalTests = false
    this.canViewMedication = false
    this.canManageMedication = false
    this.canViewMedicationPlans = false
    this.canViewPlanningForms = false
    this.canViewEvents = false
    this.canManageEvents = false
    this.canManageMessages = false
    this.canSeeMedicalVisits = false
    this.canManageRequesVisit= false
    this.canSeeCenters= false
  }
}
