import type { ReactNode } from "react"
import styles from "./VStack.module.css"

type VStackProps = {
    children?: ReactNode
}

export default function VStack({children}: VStackProps)
{
    return <div className={styles.VStack}>
        {children}
    </div>
}