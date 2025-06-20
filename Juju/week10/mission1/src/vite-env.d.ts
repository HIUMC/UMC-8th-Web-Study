/// 환경 변수 설정
/// <reference types="vite/client" />
interface ImportMetaEnv { // ImportMetaENV: VITE_ 환경 변수에 대한 타입을 정의한다.
    readonly VITE_TMDB_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}