import type { ImgHTMLAttributes } from "react";

type FetchPriority = "high" | "low" | "auto";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    priority?: boolean;
    fetchPriority?: FetchPriority;
}

export default function OptimizedImage({
    priority = false,
    decoding = "async",
    fetchPriority,
    loading,
    ...props
}: OptimizedImageProps) {
    return (
        <img
            decoding={decoding}
            fetchPriority={fetchPriority ?? (priority ? "high" : "low")}
            loading={loading ?? (priority ? "eager" : "lazy")}
            {...props}
        />
    );
}

interface OptimizedPictureProps
    extends Omit<OptimizedImageProps, "src" | "srcSet" | "width" | "height"> {
    picture: ImagePicture;
    sizes?: string;
}

export function OptimizedPicture({
    picture,
    priority = false,
    decoding = "async",
    fetchPriority,
    loading,
    sizes,
    ...props
}: OptimizedPictureProps) {
    return (
        <picture>
            {Object.entries(picture.sources).map(([format, srcSet]) => (
                <source
                    key={format}
                    srcSet={srcSet}
                    sizes={sizes}
                    type={`image/${format === "jpg" ? "jpeg" : format}`}
                />
            ))}
            <img
                decoding={decoding}
                fetchPriority={fetchPriority ?? (priority ? "high" : "low")}
                height={picture.img.h}
                loading={loading ?? (priority ? "eager" : "lazy")}
                sizes={sizes}
                src={picture.img.src}
                width={picture.img.w}
                {...props}
            />
        </picture>
    );
}
