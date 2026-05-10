/// <reference types="vite/client" />

type ImagePicture = {
    sources: Record<string, string>;
    img: {
        src: string;
        w: number;
        h: number;
    };
};

declare module "*&as=picture" {
    const picture: ImagePicture;
    export default picture;
}
