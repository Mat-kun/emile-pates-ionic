import { Injectable } from '@angular/core';
import { IPlanningService } from '../interfaces/planning-service';
import { Planning } from '../../models/planning';

@Injectable()
export class FakePlanningService implements IPlanningService {

  private plannings: Planning[]= [];

  private newId = 1;

  getAllPlannings(): Planning[] {
    return this.plannings;
  }

  addPlanning(planning: Planning): void {
    planning.id = this.newId;
    this.plannings.push(planning);
    this.newId ++;
  }

  removePlanning(planning: Planning): void {
    this.plannings.splice(this.plannings.indexOf(this.getPlanningById(planning.id)), 1);
  }

  editPlanning(planning: Planning): void {
    this.plannings[this.plannings.indexOf(this.getPlanningById(planning.id))] = planning;
  }

  getPlanningByDate(date: Date): Planning {
    let toReturn: Planning;
    this.plannings.forEach((planning: Planning): void => {
      if (planning.startingDay === date) {
        toReturn = planning;
      }
    });
    return toReturn;
  }

  getPlanningById(id: number): Planning {
    let toReturn: Planning;
    this.plannings.forEach((planning: Planning): void => {
      if (planning.id === id) {
        toReturn = planning;
      }
    });
    return toReturn;
  }

  // private getAvailableId(): number {
  //   if (this.plannings.length === 0) {
  //     return 1;
  //   }
  //   return (this.plannings[this.plannings.length - 1 ].id) + 1;
  // }

  constructor() { }

}
