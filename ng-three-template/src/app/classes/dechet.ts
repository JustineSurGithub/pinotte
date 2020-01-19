import { Bin } from './bin';

export interface Dechet {
    id: number;
    name?: string;
    bin?: Bin;
}

export const DECHETS: Dechet[] =  [
    { id  : 0, name : 'journaux', bin: Bin.Paper},
    { id  : 1, name : 'circulaires', bin: Bin.Paper},
    { id  : 2, name : 'revues', bin: Bin.Paper},
    { id  : 3, name : 'feuilles blanches', bin: Bin.Paper},
    { id  : 4, name : 'rouleaux de papier cul', bin: Bin.Paper},
    { id  : 5, name : 'boîtes d\'oeufs', bin: Bin.Paper},
    { id  : 6, name : 'cartons de lait', bin: Bin.Paper},
    { id  : 7, name : 'livres', bin: Bin.Paper},
    { id  : 8, name : 'bouteilles de jus', bin: Bin.Recycling},
    { id  : 9, name : 'pots de yogourt', bin: Bin.Recycling},
    { id  : 10, name : 'pellicules d\'emballage', bin: Bin.Recycling},
    { id  : 11, name : 'pots de mayonnaise', bin: Bin.Recycling},
    { id  : 12, name : 'bouteilles de détergent', bin: Bin.Recycling},
    { id  : 13, name : 'bouteilles de vin', bin: Bin.Recycling},
    { id  : 14, name : 'canettes de bière', bin: Bin.Recycling},
    { id  : 15, name : 'boîtes de conserve', bin: Bin.Recycling},
    { id  : 16, name : 'papier d\'aluminium', bin: Bin.Recycling},
    { id  : 17, name : 'bouchons et couvercles de plastique/métal', bin: Bin.Recycling},
    { id  : 18, name : 'vieux papiers-mouchoirs', bin: Bin.Compost},
    { id  : 19, name : 'essuie-tout usagés', bin: Bin.Compost},
    { id  : 20, name : 'confiseries', bin: Bin.Compost},
    { id  : 21, name : 'oeufs', bin: Bin.Compost},
    { id  : 22, name : 'os de poulet', bin: Bin.Compost},
    { id  : 23, name : 'fromage', bin: Bin.Compost},
    { id  : 24, name : 'sachets de tisane', bin: Bin.Compost},
    { id  : 25, name : 'bouffe à chats', bin: Bin.Compost},
    { id  : 26, name : 'écales de pinottes', bin: Bin.Compost},
    { id  : 27, name : 'soupe', bin: Bin.Waste},
    { id  : 28, name : 'couches hygiéniques', bin: Bin.Waste},
    { id  : 29, name : 'gomme à mâcher', bin: Bin.Waste},
    { id  : 30, name : 'litière de chat', bin: Bin.Waste},
    { id  : 31, name : 'feuilles mortes', bin: Bin.Waste},
    { id  : 32, name : 'roches', bin: Bin.Waste},
    { id  : 33, name : 'piles', bin: Bin.Waste},
    { id  : 34, name : 'céramique', bin: Bin.Waste},
    { id  : 35, name : 'fruits', bin: Bin.Compost}
];

