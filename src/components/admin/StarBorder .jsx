const StarBorder = ({
    as: Component = "button",
    className = "",
    color = "white",
    speed = "8s",
    thickness = 4,
    children,
    ...rest
}) => {
    return (
        <Component
            className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
            style={{
                padding: `${thickness}px 0`,
                ...rest.style
            }}
            {...rest}
        >
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className="relative z-1 bg-gradient-to-b from-gray-900 to-blue-900 border border-blue-700 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
