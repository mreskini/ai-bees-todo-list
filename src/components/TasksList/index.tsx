import { Button } from "@mui/material"
import { useState } from "react"
import CreateTaskModal from "../CreateTaskModal"
import styles from "./TasksList.module.scss"

const TasksList = () => {
    // States and Hooks
    const [isCreateNewTaskModalOpen, setIsCreateNewTaskModalOpen] =
        useState(false)

    // Methods
    const handleOpen = () => setIsCreateNewTaskModalOpen(true)
    const handleClose = () => setIsCreateNewTaskModalOpen(false)

    //   Render
    return (
        <div className={styles.tasks}>
            <Button variant="contained" onClick={handleOpen}>
                Create Your First Task ;)
            </Button>
            <CreateTaskModal
                open={isCreateNewTaskModalOpen}
                handleClose={handleClose}
            />
        </div>
    )
}

export default TasksList
