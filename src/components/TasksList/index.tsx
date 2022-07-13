import { Button } from "@mui/material"
import styles from "./TasksList.module.scss"

const TasksList = () => {
    return (
        <div className={styles.tasks}>
            <Button variant="contained">Create Your First Task ;)</Button>
        </div>
    )
}

export default TasksList
