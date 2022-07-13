import { Button, Grid, Paper } from "@mui/material"
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
                <Grid container alignItems="center" justifyContent="center">
                    <Grid xs={8}>
                        {tasksList
                            .filter(task => task.status === "OPEN")
                            .map(
                                (
                                    { title, description, priority, status },
                                    index
                                ) => {
                                    return (
                                        <Paper
                                            key={index}
                                            variant="outlined"
                                            elevation={1}
                                            className={styles.item}
                                        >
                                            <Grid
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Grid>
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        {title}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.description
                                                        }
                                                    >
                                                        {description}
                                                    </div>
                                                </Grid>
                                                <Grid>
                                                    <div
                                                        className={
                                                            styles.priority
                                                        }
                                                    >
                                                        {priority}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.actions
                                                        }
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                        >
                                                            Done Task
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="info"
                                                        >
                                                            Edit Task
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    )
                                }
                            )}
                    </Grid>
                    <FloatingAddButton handleOpen={handleOpen} />
                </Grid>
            ) : (
                <Button variant="contained" onClick={handleOpen}>
                    Create Your First Task ;)
                </Button>
            )}
        </div>
    )
}

export default TasksList
