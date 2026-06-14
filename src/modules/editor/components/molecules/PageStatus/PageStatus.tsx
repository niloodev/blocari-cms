'use client'

import { usePageStatus } from './PageStatus.hook'
import { motion } from 'motion/react'
export function PageStatus() {
    const { isDraft, status, pageName } = usePageStatus()

    return (
        <motion.div
            className="flex flex-col gap-1 items-center flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <h1 className="text-xs leading-[110%]">{pageName}</h1>
            {status[isDraft ? 'draft' : 'published']}
        </motion.div>
    )
}
