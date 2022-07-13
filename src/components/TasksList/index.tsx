import { Button } from "@mui/material"
import { useState } from "react"
import { useApp } from "../../contexts/AppContext"
import CreateTaskModal from "../CreateTaskModal"
import FloatingAddButton from "../FloatingAddButton"
import styles from "./TasksList.module.scss"

const TasksList = () => {
    // States and Hooks
    const { tasksList } = useApp()
    const showTasksList = tasksList.length > 0
    const [isCreateNewTaskModalOpen, setIsCreateNewTaskModalOpen] =
        useState(false)

    // Methods
    const handleOpen = () => setIsCreateNewTaskModalOpen(true)
    const handleClose = () => setIsCreateNewTaskModalOpen(false)

    //   Render
    return (
        <div className={styles.tasks}>
            <CreateTaskModal
                open={isCreateNewTaskModalOpen}
                handleClose={handleClose}
            />
            {showTasksList ? (
                <>
                    <div>Tasks List</div>
                    <FloatingAddButton handleOpen={handleOpen} />
                </>
            ) : (
                <Button variant="contained" onClick={handleOpen}>
                    Create Your First Task ;)
                </Button>
            )}
        </div>
    )
}

export default TasksList
