import { useState, useEffect } from 'react';

export default function PointsCounter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (target <= 0) return;

        let start = 0;
        const duration = 1000; // 1 segundo
        const increment = target / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target]);

    return <span>{count}</span>;
}
