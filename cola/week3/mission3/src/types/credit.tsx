export type Credit = {
  id: number;
  name: string;
  profile_path: string | null;
};

export type CastMember = Credit & {
  character: string;
};

export type CrewMember = Credit & {
  job: string;
};

export type CreditResponse = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};
