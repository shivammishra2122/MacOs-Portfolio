interface WallpaperProps {
    image?: string;
}

export const Wallpaper = ({ image }: WallpaperProps) => {
    return (
        <div className="absolute inset-0 -z-50 overflow-hidden w-full h-full">
            {image ? (
                <img
                    src={image}
                    alt="Wallpaper"
                    className="w-full h-full object-cover"
                />
            ) : (
                // MacOS Sonoma-ish gradient
                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400" />
            )}

            {/* Optional: Add a subtle overlay for better text contrast if needed later */}
            <div className="absolute inset-0 bg-black/10" />
        </div>
    );
};
