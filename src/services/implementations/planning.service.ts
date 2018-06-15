import { Injectable } from '@angular/core';
import { IPlanningService } from '../interfaces/planning-service';
import { Planning } from '../../models/planning';

@Injectable()
export class PlanningService implements IPlanningService {
  getAllPlannings(): Planning[] {
    throw new Error('Method not implemented.');
  }
  getPlanningByDate(date: Date): Planning {
    throw new Error('Method not implemented.');
  }
  addPlanning(planning: Planning): void  {
    throw new Error('Method not implemented.');
  }
  removePlanning(planning: Planning): void {
    throw new Error('Method not implemented.');
  }
  editPlanning(planning: Planning): void {
    throw new Error('Method not implemented.');
  }
  getPlanningById(id: number): Planning {
    throw new Error('Method not implemented.');
  }

  constructor() { }

}
