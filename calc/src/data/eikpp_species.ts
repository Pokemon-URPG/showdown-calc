import * as I from './interface';
import {toID, extend, DeepPartial, assignWithout} from '../util';

export interface SpeciesData {
  readonly types: [I.TypeName] | [I.TypeName, I.TypeName];
  // TODO: replace with baseStats
  readonly bs: {
    hp: number;
    at: number;
    df: number;
    sa?: number;
    sd?: number;
    sp: number;
    sl?: number;
  };
  readonly weightkg: number; // weight
  readonly nfe?: boolean;
  readonly gender?: I.GenderName;
  readonly otherFormes?: string[];
  readonly baseSpecies?: string;
  readonly abilities?: {0: string}; // ability
}

const RBY: {[name: string]: SpeciesData} = {
  Zubat: {
    types: ['Poison', 'Flying'],
    bs: {hp: 40, at: 45, df: 35, sp: 55, sl: 40},
    weightkg: 7.5,
    nfe: true,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Zubat: {bs: {sa: 30, sd: 40}},
  // gen 2 pokemon
  Ampharos: {
    types: ['Electric'],
    bs: {hp: 90, at: 75, df: 75, sa: 115, sd: 90, sp: 55},
    weightkg: 61.5,
  },
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Zubat: {abilities: {0: 'Inner Focus'}},
  // gen 2 pokemon changes
  Ampharos: {abilities: {0: 'Static'}},
  // gen 3 pokemon
  Absol: {
    types: ['Dark'],
    bs: {hp: 65, at: 130, df: 60, sa: 75, sd: 60, sp: 75},
    weightkg: 47,
    abilities: {0: 'Pressure'},
  },
};

const ADV: {[name: string]: SpeciesData} = extend(true, {}, GSC, ADV_PATCH);

const DPP_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Giratina: {
    types: ['Ghost', 'Dragon'],
    bs: {hp: 150, at: 100, df: 120, sa: 100, sd: 120, sp: 90},
    weightkg: 750,
    gender: 'N',
    otherFormes: ['Giratina-Origin'],
    abilities: {0: 'Pressure'},
  },
  'Giratina-Origin': {
    types: ['Ghost', 'Dragon'],
    bs: {hp: 150, at: 120, df: 100, sa: 120, sd: 100, sp: 90},
    weightkg: 650,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Giratina',
  },
};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Accelgor: {
    types: ['Bug'],
    bs: {hp: 80, at: 70, df: 40, sa: 100, sd: 60, sp: 145},
    weightkg: 25.3,
    abilities: {0: 'Hydration'},
  },
};

const BW: {[name: string]: SpeciesData} = extend(true, {}, DPP, BW_PATCH);

const XY_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Absol: {otherFormes: ['Absol-Mega']},
  'Absol-Mega': {
    types: ['Dark'],
    bs: {hp: 65, at: 150, df: 60, sa: 115, sd: 60, sp: 115},
    weightkg: 49,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Absol',
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);

const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Zeraora: {
    types: ['Electric'],
    bs: {hp: 88, at: 112, df: 75, sa: 102, sd: 80, sp: 143},
    weightkg: 44.5,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);

const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Applin: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 40, at: 40, df: 80, sa: 40, sd: 40, sp: 20},
    weightkg: 0.5,
    abilities: {0: 'Ripen'},
    nfe: true,
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);

const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Arcanine-Hisui': {
    types: ['Fire', 'Rock'],
    bs: {hp: 95, at: 115, df: 80, sa: 95, sd: 80, sp: 90},
    weightkg: 168,
    abilities: {0: 'Intimidate'},
  },
};

const SV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Aurogon: {
    types: ['Rock', 'Dragon'],
    bs: {hp: 108, at: 92, df: 77, sa: 92, sd: 88, sp: 86},
    weightkg: 153.5,
    abilities: {0: 'Refrigerate'},
  },
  Benite: {
    types: ['Normal', 'Flying'],
    bs: {hp: 110, at: 131, df: 90, sa: 70, sd: 73, sp: 73},
    weightkg: 172.5,
    abilities: {0: 'Fluffy'},
  },
  Celeroc: {
    types: ['Psychic', 'Rock'],
    bs: {hp: 91, at: 110, df: 76, sa: 85, sd: 88, sp: 108},
    weightkg: 15,
    abilities: {0: 'Natural Cure'},
    gender: 'N',
  },
  Chandeltic: {
    types: ['Ghost', 'Water'],
    bs: {hp: 71, at: 58, df: 82, sa: 130, sd: 101, sp: 80},
    weightkg: 98.2,
    abilities: {0: 'Flash Fire'},
  },
  Cofaslash: {
    types: ['Ghost', 'Steel'],
    bs: {hp: 58, at: 50, df: 141, sa: 80, sd: 116, sp: 50},
    weightkg: 64.8,
    abilities: {0: 'Mummy'},
  },
  Darktres: {
    types: ['Dark', 'Flying'],
    bs: {hp: 76, at: 96, df: 90, sa: 131, sd: 88, sp: 101},
    weightkg: 55.3,
    abilities: {0: 'Bad Dreams'},
    gender: 'N',
  },
  Dhelmterra: {
    types: ['Ghost', 'Ground'],
    bs: {hp: 78, at: 116, df: 103, sa: 82, sd: 88, sp: 50},
    weightkg: 260,
    abilities: {0: 'Steelworker'},
    gender: 'N',
  },
  Dragozone: {
    types: ['Dragon', 'Electric'],
    bs: {hp: 84, at: 91, df: 108, sa: 110, sd: 96, sp: 66},
    weightkg: 195,
    abilities: {0: 'Inner Focus'},
  },
  Exeggumence: {
    types: ['Grass', 'Flying'],
    bs: {hp: 95, at: 121, df: 81, sa: 120, sd: 76, sp: 85},
    weightkg: 111.3,
    abilities: {0: 'Chlorophyll'},
  },
  Ferrovile: {
    types: ['Grass', 'Ice'],
    bs: {hp: 72, at: 111, df: 87, sa: 51, sd: 105, sp: 90},
    weightkg: 72,
    abilities: {0: 'Iron Barbs'},
  },
  Gardelade: {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 68, at: 105, df: 65, sa: 105, sd: 115, sp: 80},
    weightkg: 50.2,
    abilities: {0: 'Synchronize'},
  },
  Garleon: {
    types: ['Dragon', 'Steel'],
    bs: {hp: 100, at: 100, df: 90, sa: 90, sd: 90, sp: 74},
    weightkg: 89.8,
    abilities: {0: 'Sand Veil'},
  },
  Goocor: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 85, at: 96, df: 106, sa: 88, sd: 125, sp: 90},
    weightkg: 96.5,
    abilities: {0: 'Sap Sipper'},
  },
  Hawltei: {
    types: ['Fighting', 'Fire'],
    bs: {hp: 90, at: 107, df: 81, sa: 79, sd: 67, sp: 106},
    weightkg: 109.8,
    abilities: {0: 'Limber'},
  },
  Haxdile: {
    types: ['Dragon', 'Dark'],
    bs: {hp: 82, at: 127, df: 83, sa: 61, sd: 70, sp: 93},
    weightkg: 100.9,
    abilities: {0: 'Rivalry'},
  },
  Krookonite: {
    types: ['Ground', 'Flying'],
    bs: {hp: 93, at: 128, df: 90, sa: 76, sd: 80, sp: 84},
    weightkg: 153.2,
    abilities: {0: 'Intimidate'},
  },
  Kyuzor: {
    types: ['Dragon', 'Steel'],
    bs: {hp: 106, at: 130, df: 96, sa: 105, sd: 86, sp: 75},
    weightkg: 221.5,
    abilities: {0: 'Pressure'},
    gender: 'N',
  },
  Lansteel: {
    types: ['Water', 'Steel'],
    bs: {hp: 110, at: 69, df: 119, sa: 75, sd: 100, sp: 55},
    weightkg: 113.8,
    abilities: {0: 'Volt Absorb'},
  },
  Latiacorio: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 78, at: 73, df: 76, sa: 106, sd: 110, sp: 98},
    weightkg: 21.7,
    abilities: {0: 'Levitate'},
  },
  Latianine: {
    types: ['Dragon', 'Fire'],
    bs: {hp: 83, at: 100, df: 83, sa: 106, sd: 113, sp: 100},
    weightkg: 97.5,
    abilities: {0: 'Levitate'},
  },
  Mimirem: {
    types: ['Ghost', 'Ice'],
    bs: {hp: 78, at: 116, df: 86, sa: 76, sd: 100, sp: 95},
    weightkg: 162.9,
    abilities: {0: 'Disguise'},
  },
  Necroluff: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 89, at: 72, df: 80, sa: 103, sd: 91, sp: 99},
    weightkg: 116.5,
    abilities: {0: 'Prism Armor'},
    gender: 'N',
  },
  Noiswine: {
    types: ['Flying', 'Ground'],
    bs: {hp: 93, at: 110, df: 80, sa: 88, sd: 73, sp: 94},
    weightkg: 188,
    abilities: {0: 'Frisk'},
  },
  Oriselia: {
    types: ['Fire', 'Psychic'],
    bs: {hp: 90, at: 70, df: 96, sa: 90, sd: 86, sp: 87},
    weightkg: 44.5,
    abilities: {0: 'Dancer'},
  },
  Palotrum: {
    types: ['Ghost', 'Dragon'],
    bs: {hp: 84, at: 105, df: 116, sa: 89, sd: 69, sp: 59},
    weightkg: 260,
    abilities: {0: 'Water Compaction'},
  },
  Porystar: {
    types: ['Normal', 'Water'],
    bs: {hp: 80, at: 66, df: 106, sa: 128, sd: 73, sp: 66},
    weightkg: 34.5,
    abilities: {0: 'Adaptability'},
    gender: 'N',
  },
  Porytoise: {
    types: ['Normal', 'Water'],
    bs: {hp: 83, at: 82, df: 90, sa: 118, sd: 85, sp: 82},
    weightkg: 60.3,
    abilities: {0: 'Adaptability'},
    gender: 'N',
  },
  Proboster: {
    types: ['Rock', 'Ice'],
    bs: {hp: 56, at: 81, df: 168, sa: 78, sd: 115, sp: 60},
    weightkg: 236.3,
    abilities: {0: 'Sturdy'},
  },
  Regivenant: {
    types: ['Rock', 'Ghost'],
    bs: {hp: 81, at: 106, df: 117, sa: 55, sd: 94, sp: 54},
    weightkg: 150.5,
    abilities: {0: 'Clear Body'},
    gender: 'N',
  },
  Regixorus: {
    types: ['Ice', 'Dragon'],
    bs: {hp: 78, at: 114, df: 93, sa: 86, sd: 156, sp: 81},
    weightkg: 140.3,
    abilities: {0: 'Clear Body'},
    gender: 'N',
  },
  Scolichomp: {
    types: ['Bug', 'Ground'],
    bs: {hp: 76, at: 120, df: 93, sa: 63, sd: 74, sp: 105},
    weightkg: 147.8,
    abilities: {0: 'Poison Point'},
  },
  Spiridra: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 63, at: 97, df: 82, sa: 98, sd: 122, sp: 65},
    weightkg: 129.3,
    abilities: {0: 'Pressure'},
  },
  Syldily: {
    types: ['Fairy', 'Grass'],
    bs: {hp: 92, at: 75, df: 86, sa: 100, sd: 122, sp: 48},
    weightkg: 42,
    abilities: {0: 'Cute Charm'},
  },
  Talonperior: {
    types: ['Fire', 'Rock'],
    bs: {hp: 90, at: 120, df: 110, sa: 67, sd: 64, sp: 68},
    weightkg: 153.7,
    abilities: {0: 'Flame Body'},
  },
  'Test-Mon': {
    types: ['Normal', 'Ghost'],
    bs: {hp: 60, at: 60, df: 60, sa: 60, sd: 60, sp: 60},
    weightkg: 60,
    abilities: {0: 'Normalize'},
  },
  Togeki: {
    types: ['Fairy', 'Steel'],
    bs: {hp: 75, at: 70, df: 92, sa: 106, sd: 105, sp: 76},
    weightkg: 20.5,
    abilities: {0: 'Hustle'},
  },
  Togemagius: {
    types: ['Fairy', 'Ghost'],
    bs: {hp: 76, at: 56, df: 71, sa: 115, sd: 111, sp: 96},
    weightkg: 21.2,
    abilities: {0: 'Hustle'},
  },
  Tortgron: {
    types: ['Grass', 'Rock'],
    bs: {hp: 86, at: 109, df: 155, sa: 70, sd: 76, sp: 52},
    weightkg: 335,
    abilities: {0: 'Overgrow'},
  },
  Volcadactyl: {
    types: ['Bug', 'Flying'],
    bs: {hp: 83, at: 90, df: 65, sa: 110, sd: 95, sp: 120},
    weightkg: 52.5,
    abilities: {0: 'Flame Body'},
  },
  Volcantrum: {
    types: ['Bug', 'Dragon'],
    bs: {hp: 84, at: 100, df: 101, sa: 113, sd: 89, sp: 80},
    weightkg: 158,
    abilities: {0: 'Flame Body'},
  },
};


const SV: {[name: string]: SpeciesData} = extend(true, {}, SS, SV_PATCH, PLA_PATCH);

delete SV['Zubat'];
delete SV['Ampharos'];
delete SV['Absol'];
delete SV['Absol-Mega'];
delete SV['Giratina'];
delete SV['Giratina-Origin'];
delete SV['Accelgor'];
delete SV['Zeraora'];
delete SV['Applin'];
delete SV ['Arcanine-Hisui'];

export const SPECIES = [{}, RBY, GSC, ADV, DPP, BW, XY, SM, SS, SV];

export class Species implements I.Species {
  private readonly gen: I.GenerationNum;

  constructor(gen: I.GenerationNum) {
    this.gen = gen;
  }

  get(id: I.ID) {
    return SPECIES_BY_ID[this.gen][id];
  }

  *[Symbol.iterator]() {
    for (const id in SPECIES_BY_ID[this.gen]) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Specie implements I.Specie {
  readonly kind: 'Species';
  readonly id: I.ID;
  readonly name: I.SpeciesName;
  readonly types!: [I.TypeName] | [I.TypeName, I.TypeName];
  readonly baseStats: Readonly<I.StatsTable>;
  readonly weightkg!: number; // weight
  readonly nfe?: boolean;
  readonly gender?: I.GenderName;
  readonly otherFormes?: I.SpeciesName[];
  readonly baseSpecies?: I.SpeciesName;
  readonly abilities?: {0: I.AbilityName}; // ability

  private static readonly EXCLUDE = new Set(['bs', 'otherFormes']);

  constructor(name: string, data: SpeciesData) {
    this.kind = 'Species';
    this.id = toID(name);
    this.name = name as I.SpeciesName;

    const baseStats: Partial<I.StatsTable> = {};
    baseStats.hp = data.bs.hp;
    baseStats.atk = data.bs.at;
    baseStats.def = data.bs.df;
    baseStats.spa = gen >= 2 ? data.bs.sa : data.bs.sl;
    baseStats.spd = gen >= 2 ? data.bs.sd : data.bs.sl;
    baseStats.spe = data.bs.sp;
    this.baseStats = baseStats as I.StatsTable;
    // Hack for getting Gmax pokemon out of existence in Gen 9+
    if (data.otherFormes) {
      this.otherFormes = data.otherFormes as I.SpeciesName[];
      if (gen >= 9 && !['toxtricity', 'urshifu'].includes(this.id)) {
        this.otherFormes = this.otherFormes.filter(f => !f.endsWith('-Gmax'));
        if (!this.otherFormes.length) this.otherFormes = undefined;
        if (this.otherFormes) this.otherFormes = [...new Set(this.otherFormes)];
      }
    }

    assignWithout(this, data, Specie.EXCLUDE);
  }
}
const SPECIES_BY_ID: Array<{[id: string]: Specie}> = [];

let gen = 0;
for (const species of SPECIES) {
  const map: {[id: string]: Specie} = {};
  for (const specie in species) {
    if (gen >= 2 && species[specie].bs.sl) delete species[specie].bs.sl;
    const m = new Specie(specie, species[specie]);
    map[m.id] = m;
  }
  SPECIES_BY_ID.push(map);
  gen++;
}
