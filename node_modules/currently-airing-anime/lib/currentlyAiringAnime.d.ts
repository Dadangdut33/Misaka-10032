export declare type Season = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
export declare type MediaSort = 'ID' | 'ID_DESC' | 'TITLE_ROMAJI' | 'TITLE_ROMAJI_DESC' | 'TITLE_ENGLISH' | 'TITLE_ENGLISH_DESC' | 'TITLE_NATIVE' | 'TITLE_NATIVE_DESC' | 'TYPE' | 'TYPE_DESC' | 'FORMAT' | 'FORMAT_DESC' | 'START_DATE' | 'START_DATE_DESC' | 'END_DATE' | 'END_DATE_DESC' | 'SCORE' | 'SCORE_DESC' | 'POPULARITY' | 'POPULARITY_DESC' | 'EPISODES' | 'EPISODES_DESC' | 'DURATION' | 'DURATION_DESC' | 'STATUS' | 'STATUS_DESC' | 'UPDATED_AT' | 'UPDATED_AT_DESC';
export declare type Options = {
    malIdIn?: number | number[];
    aniIdIn?: number | number[];
    season?: Season | boolean;
    includeSchedule?: boolean;
    isReleasing?: boolean;
    seasonYear?: number | number[] | boolean;
    sort?: string[];
};
export declare type AiringEpisode = {
    id: number;
    episode: number;
    airingAt: number;
    timeUntilAiring: number;
};
export declare type Media = {
    id: number;
    idMal: number;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    studios: {
        edges: {
            node: {
                name: string;
            };
        }[];
    };
    genres: string[];
    status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED';
    coverImage: {
        large: string;
    };
    episodes: number;
    nextAiringEpisode: AiringEpisode;
    airingSchedule: {
        edges: {
            node: AiringEpisode;
        }[];
    };
};
export declare type AiringAnime = {
    shows: Media[];
    next: () => Promise<AiringAnime> | null;
};
declare function currentlyAiringAnime(options?: Options): Promise<AiringAnime>;
export default currentlyAiringAnime;
