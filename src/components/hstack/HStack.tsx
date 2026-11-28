import type { ReactNode } from "react"
import styles from "./HStack.module.css"

type VStackProps = {
    children?: ReactNode
}

export default function HStack({children}: VStackProps)
{
    return <div className={styles.HStack}>
        {children}
    </div>
}