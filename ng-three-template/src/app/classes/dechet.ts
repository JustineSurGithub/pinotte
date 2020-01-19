import { Bin } from './bin';

export interface Dechet {
    id: number;
    name?: string;
    type?: Bin;
}

export const DECHETS: Dechet[] =  [
    { id  : 0, name : 'journaux', type: Bin.Paper},
    { id  : 1, name : 'circulaires', type: Bin.Paper},
    { id  : 2, name : 'revues', type: Bin.Paper},
    { id  : 3, name : 'feuilles blanches', type: Bin.Paper},
    { id  : 4, name : 'rouleaux de papier cul', type: Bin.Paper},
    { id  : 5, name : 'boîtes d\'oeufs', type: Bin.Paper},
    { id  : 6, name : 'cartons de lait', type: Bin.Paper},
    { id  : 7, name : 'livres', type: Bin.Paper},
    { id  : 8, name : 'bouteilles de jus', type: Bin.Recycling},
    { id  : 9, name : 'pots de yogourt', type: Bin.Recycling},
    { id  : 10, name : 'pellicules d\'emballage', type: Bin.Recycling},
    { id  : 11, name : 'pots de mayonnaise', type: Bin.Recycling},
    { id  : 12, name : 'bouteilles de détergent', type: Bin.Recycling},
    { id  : 13, name : 'bouteilles de vin', type: Bin.Recycling},
    { id  : 14, name : 'canettes de bière', type: Bin.Recycling},
    { id  : 15, name : 'boîtes de conserve', type: Bin.Recycling},
    { id  : 16, name : 'papier d\'aluminium', type: Bin.Recycling},
    { id  : 17, name : 'bouchons et couvercles de plastique/métal', type: Bin.Recycling},
    { id  : 18, name : 'vieux papiers-mouchoirs', type: Bin.Compost},
    { id  : 19, name : 'essuie-tout usagés', type: Bin.Compost},
    { id  : 20, name : 'confiseries', type: Bin.Compost},
    { id  : 21, name : 'oeufs', type: Bin.Compost},
    { id  : 22, name : 'os de poulet', type: Bin.Compost},
    { id  : 23, name : 'fromage', type: Bin.Compost},
    { id  : 24, name : 'sachets de tisane', type: Bin.Compost},
    { id  : 25, name : 'bouffe à chats', type: Bin.Compost},
    { id  : 26, name : 'écales de pinottes', type: Bin.Compost},
    { id  : 27, name : 'soupe', type: Bin.Waste},
    { id  : 28, name : 'couches hygiéniques', type: Bin.Paper},
    { id  : 29, name : 'gomme à mâcher', type: Bin.Paper},
    { id  : 30, name : 'litière de chat', type: Bin.Paper},
    { id  : 31, name : 'feuilles mortes', type: Bin.Paper},
    { id  : 32, name : 'roches', type: Bin.Paper},
    { id  : 33, name : 'piles', type: Bin.Paper},
    { id  : 34, name : 'céramique', type: Bin.Paper},
    { id  : 35, name : 'polystyrène', type: Bin.Waste}
];

