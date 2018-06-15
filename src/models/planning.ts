import { Recipe } from './recipe';

export interface Planning {
    id?: number;
    name: string;
    meals: DailyMeal[];
    startingDay: Date;
}

export interface DailyMeal {
    day: Day;
    breakfast: any;
    lunch: any;
    dinner: any;
}

export enum Day {
    Monday = 'Lundi',
    Tuesday = 'Mardi',
    Wednesday = 'Mercredi',
    Thursday = 'Jeudi',
    Friday = 'Vendredi',
    Saturday = 'Samedi',
    Sunday = 'Dimanche'
}
