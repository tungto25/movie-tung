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
                className="absolute w-[300%] h-[25%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[25%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className="relative z-1  text-white text-center text-[12px] py-[10px] px-[20px] rounded-[15px]
              transition-shadow duration-300 active:scale-95">
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
