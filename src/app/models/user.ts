export interface User {
    username?: string,
    idUser?:number,
    image?:string,
    first_name?: string,
    last_name?: string,
    agendas?: Agenda[],
    diets?: Diet[],
    advices?: Advice[],
    games?: Game[],
    drugs?: Drug[],
    goals?: Goal[],
    physical?: PhysicalActivity[]
}


export interface Diet {
    name?: string,
    first_name?: string,
    id?: number,
    hour?: string,
    image?: string,
    description?: string
}

export interface Advice {
    name?: string,
    id?: number,
    image?: string,
    description?: string
}

export interface Agenda {
    id?: number,
    title?: string,
    doctor?: string,
    description?: string,
    start_time?: string,
    start_date?: string,
    end_date?: string,
    start_date_iso8601?: string
    hide?: boolean
}

export interface Game {
    name?: string,
    id?: number,
    form_id?: string,
    type?: string,
    url?: string,
    image?: string
    scheduled_date?:string
}

export interface Drug {
    id?: number,
    name?: string,
    date_intake?: string,
    hour_intake?: string,
    dose?: number,
    alias?: string,
    state?: number,
    forgotten?: number
}

export interface Goal {
    hour: string;
    id?: number,
    name?: string,
    description?: string,
    min?: number,
    max?: number,
    steps?: number
}

export interface PhysicalActivity {
    id?: number,
    name?: string,
    description?: string,
    calories?: number,
    kilometers?: number,
    steps?: number
}

export interface UserProfile{
    idUser: number,
    image: string,
    first_name: string,
    last_name: string,
    birthdate:string,
    birthdate_european: string,
    gender: string,
    weight: string,
    height: string,
    blood_group: string,
    // diagnostics: [string,string],
    temporaryUrl:string,
    allergies: [],
    diagnostics: [],
    phone:string,
    language:any
}

export interface FamilyUnit {
    id?: number,
    name?: string,
    initials?: string,
    age?: string,
    thumbnail?: string,
    family_relationship?: string
}
export interface Mentoring {
    age?: string,
    id?: number,
    initials?: string,
    name?: string,
    socialRelationType?:string,
    thumbnail?: string,
}
export interface Tutor {
    age?: string,
    id?: number,
    initials?: string,
    name?: string,
    socialRelationType?:string,
    thumbnail?: string,
}

export interface HealthCard {
    id?: number,
    name?: string,
    modality?: string,
    affiliation_number?: string,
    expiration_date?: string,
    expedition_date?: string,
    thumbnail?: string,
}

export interface EmergencyContact {
    id?: number,
    full_name?: string,
    email?: string,
    phone?: string,
    thumbnail?: string,
    created_at?: string,
    socialRelationType?: string,
}
