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
