import { Planning } from '../../models/planning';

export interface IPlanningService {
    addPlanning(planning: Planning): void;

    removePlanning(planning: Planning): void;

    editPlanning(planning: Planning): void;

    getAllPlannings(): Planning[];

    getPlanningByDate(date: Date): Planning;

    getPlanningById(id: number): Planning;
}
