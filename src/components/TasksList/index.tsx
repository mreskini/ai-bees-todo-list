import { Button, Grid, Paper } from "@mui/material"
import { useState } from "react"
import { Task, useApp } from "../../contexts/AppContext"
import CreateTaskModal from "../CreateTaskModal"
import FloatingAddButton from "../FloatingAddButton"
import TaskDetailsModal from "../TaskDetailsModal"
import styles from "./TasksList.module.scss"

const TasksList = () => {
    // States and Hooks
    const { tasksList, getTaskByToken, doneTaskByToken } = useApp()
    const openTasksList = tasksList.filter(task => task.status === "OPEN")
    const showTasksList = openTasksList.length > 0
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

    const [currentTask, setCurrentTask] = useState<Task | undefined>(
        openTasksList[0]
    )

    // Methods
    const handleCreateModalOpen = () => setIsCreateModalOpen(true)

    const handleCreateModalClose = () => setIsCreateModalOpen(false)

    const handleDetailsModalOpen = (token: string) => {
        const task = getTaskByToken(token)
        setCurrentTask(task)
        setIsDetailsModalOpen(true)
    }

    const handleDetailsModalClose = () => setIsDetailsModalOpen(false)
    const onEditTaskClick = (event: any): void => {
        event.stopPropagation()
    }
    const onDoneTaskClick = (event: any, token: string): void => {
        doneTaskByToken(token)
        event.stopPropagation()
    }

    //   Render
    return (
        <div className={styles.tasks}>
            <CreateTaskModal
                open={isCreateModalOpen}
                handleClose={handleCreateModalClose}
            />
            {currentTask && (
                <TaskDetailsModal
                    open={isDetailsModalOpen}
                    handleClose={handleDetailsModalClose}
                    task={currentTask}
                />
            )}
            {showTasksList ? (
                <Grid container alignItems="center" justifyContent="center">
                    <Grid xs={8}>
                        {openTasksList.map(
                            (
                                { token, title, description, priority },
                                index
                            ) => {
                                return (
                                    <Button
                                        key={index}
                                        className={styles.item}
                                        onClick={() =>
                                            handleDetailsModalOpen(token)
                                        }
                                    >
                                        <Paper
                                            variant="outlined"
                                            elevation={1}
                                            className={styles["item-inner"]}
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
                                                        {description.slice(
                                                            0,
                                                            30
                                                        )}
                                                        {description.length >
                                                            30 && "..."}
                                                    </div>
                                                </Grid>
                                                <Grid>
                                                    <div
                                                        className={
                                                            styles.priority
                                                        }
                                                    >
                                                        <div>{priority}</div>
                                                        <div
                                                            className={`${
                                                                styles.bullet
                                                            } ${
                                                                styles[
                                                                    priority ===
                                                                    "HIGH"
                                                                        ? "bullet-high"
                                                                        : priority ===
                                                                          "MEDIUM"
                                                                        ? "bullet-mid"
                                                                        : "bullet-low"
                                                                ]
                                                            }`}
                                                        ></div>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.actions
                                                        }
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={event =>
                                                                onDoneTaskClick(
                                                                    event,
                                                                    token
                                                                )
                                                            }
                                                        >
                                                            Done Task
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="info"
                                                            onClick={
                                                                onEditTaskClick
                                                            }
                                                        >
                                                            Edit Task
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Button>
                                )
                            }
                        )}
                    </Grid>
                    <FloatingAddButton handleOpen={handleCreateModalOpen} />
                </Grid>
            ) : (
                <Button variant="contained" onClick={handleCreateModalOpen}>
                    Create Your First Task ;)
                </Button>
            )}
        </div>
    )
}

export default TasksList
