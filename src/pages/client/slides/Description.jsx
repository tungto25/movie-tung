import { useState } from "react";

export function Description({ text, maxLength = 150 }) {
    const [expanded, setExpanded] = useState(false);

    if (!text) return null;

    const isLong = text.length > maxLength;
    const displayText = expanded ? text : text.slice(0, maxLength) + (isLong ? "..." : "");

    return (
        <p className="">
            {displayText}
            {isLong && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="ml-2 text-yellow-400 hover:underline"
                >
                    {expanded ? "Ẩn bớt" : "Xem thêm"}
                </button>
            )}
        </p>
    );
}
