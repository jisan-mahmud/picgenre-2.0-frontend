import { motion } from 'motion/react'

/* eslint-disable react-hooks/static-components -- motionTag caches created motion components at module scope; safe for React Compiler despite the heuristic. */

const DIRECTIONS = {
    up: { y: 32 },
    down: { y: -32 },
    left: { x: 32 },
    right: { x: -32 },
    fade: {},
    zoom: { scale: 0.9 },
}

const tagCache = new Map()

function motionTag(Tag) {
    if (!tagCache.has(Tag)) tagCache.set(Tag, motion.create(Tag))
    return tagCache.get(Tag)
}

export default function Reveal({
    as: Tag = 'div',
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className,
    children,
    ...rest
}) {
    const Movement = motionTag(Tag)

    return (
        <Movement
            className={className}
            initial={{ opacity: 0, ...DIRECTIONS[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration, delay: delay / 1000, ease: 'easeOut' }}
            {...rest}
        >
            {children}
        </Movement>
    )
}