import { Button } from "@mui/material"
import { useApp } from "../../contexts/AppContext"
import styles from "./Header.module.scss"

const Header = () => {
    // States and Hooks
    const { tasksList } = useApp()
    const showDoneTasksButton: boolean = tasksList.length > 0

    // Render
    return (
        <div className={styles.header}>
            {showDoneTasksButton && (
                <div>
                    <Button variant="contained" color="success">
                        View Done Tasks
                    </Button>
                </div>
            )}
            <div className={styles.title}>Hello World</div>
            {showDoneTasksButton && <div></div>}
        </div>
    )
}

export default Header
