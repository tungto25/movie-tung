export default function GradientText({
    children,
    className = "",
    colors,
    animationSpeed = 8,
    showBorder = false,
}) {
    // Nếu không truyền colors, tự random 3-5 màu
    const getRandomGradient = () => {
        const n = 3 + Math.floor(Math.random() * 3); // 3-5 màu
        const randomColors = [];
        for (let i = 0; i < n; i++) {
            const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            randomColors.push(color);
        }
        return randomColors;
    };

    const gradientColors = colors || getRandomGradient();

    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${gradientColors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <div
            className={`relative mx-auto flex max-w-fit flex-row items-center justify-center font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
        >
            {showBorder && (
                <div
                    className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
                    style={{
                        ...gradientStyle,
                        backgroundSize: "300% 100%",
                    }}
                >
                    <div
                        className="absolute inset-0 bg-black z-[-1]"
                        style={{
                            width: "calc(100% - 2px)",
                            height: "calc(100% - 2px)",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    ></div>
                </div>
            )}
            <div
                className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
                style={{
                    ...gradientStyle,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundSize: "300% 100%",
                }}
            >
                {children}
            </div>
        </div>
    );
}
