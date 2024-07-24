type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
  isFetching: boolean;
};

type FilmPartialData = {
  title: string;
  url: string;
  isFetching: boolean;
};

type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

type TableHeader = {
  name: string;
  component?: React.FC<{ props: any; onClick: (() => void) | undefined }>;
  action?: () => void;
};

type TablePagination = {
  count: number;
  next: string | null;
  previous: string | null;
};

type TableHeaders = TableHeader[];

export type {
  Person,
  Film,
  FilmPartialData,
  TableHeaders,
  PeopleResponse,
  TablePagination,
};
