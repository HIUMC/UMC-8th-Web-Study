export type Cast = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  };
  
  export type Crew = {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  };

  export type Credit = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};
  
  export type CreditsResponse = {
    id: number;
    cast: Cast[];
    crew: Crew[];
  };
