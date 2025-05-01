export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type MovieResponse = {
    page: number,
    results: Movie[],
    totalPages: number,
    total_results: number,
};

type Genre = {
    id: number;
    name: string;
}

type ProductinoCompany = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

type ProductionCountries = {
    iso_3166_1: string;
    name: string;
}

type SpokenLanguages = {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export type MovieDetailResponse = {
        "adult": boolean,
        "backdrop_path": string,
        "belongs_to_collection": {
            "id": number,
            "name": string,
            "poster_path": string,
            "backdrop_path": string
        },
        "budget": number,
        "genres": Genre[],
        "homepage": string,
        "id": number,
        "imdb_id": string,
        "origin_country": string[],
        "original_language": string,
        "original_title": string,
        "overview": string,
        "popularity": number,
        "poster_path": string,
        "production_companies": ProductinoCompany[],
        "production_countries": ProductionCountries[],
        "release_date": string,
        "revenue": number,
        "runtime": number,
        "spoken_languages": SpokenLanguages[],
        "status": string,
        "tagline": string,
        "title": string,
        "video": boolean,
        "vote_average": number,
        "vote_count": number
}

type Cast = {
    "adult": boolean,
    "gender": number,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": string,
    "cast_id": number,
    "character": string,
    "credit_id": string,
    "order": number
}

export type MovieCreditResponse = {
    "id": number,
    "cast": Cast[],
}