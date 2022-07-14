import { Button, Grid, Paper } from "@mui/material"
import { useApp } from "../../contexts/AppContext"
import { Task, useTasks } from "../../contexts/TasksContext"
import CreateTaskModal from "../CreateTaskModal"
import EditTaskModal from "../EdtiTaskModal"
import FloatingAddButton from "../FloatingAddButton"
import TaskDetailsModal from "../TaskDetailsModal"
import styles from "./TasksList.module.scss"

const TasksList = () => {
    // States and Hooks
    const { tasksList, doneTaskByToken } = useTasks()
    const {
        isDetailsModalOpen,
        isCreateModalOpen,
        isEditModalOpen,
        currentTask,

        handleCreateModalOpen,
        handleCreateModalClose,
        handleDetailsModalOpen,
        handleDetailsModalClose,
        handleEditModalOpen,
        handleEditModalClose,
    } = useApp()

    const openTasksList = tasksList.filter(task => task.status === "OPEN")
    const showTasksList = openTasksList.length > 0

    // Methods
    const onEditTaskClick = (event: any, task: Task): void => {
        event.stopPropagation()
        handleEditModalOpen(task)
    }

    const onDoneTaskClick = (event: any, token: string): void => {
        doneTaskByToken(token)
        event.stopPropagation()
    }

    const editTaskButtonClickInDetailsModal = (task: Task) => {
        handleDetailsModalClose()
        handleEditModalOpen(task)
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
                    editClick={editTaskButtonClickInDetailsModal}
                />
            )}
            {currentTask && (
                <EditTaskModal
                    open={isEditModalOpen}
                    handleClose={handleEditModalClose}
                    task={currentTask}
                />
            )}
            {showTasksList ? (
                <Grid container alignItems="center" justifyContent="center">
                    <Grid xs={8}>
                        {openTasksList.map((task, index) => {
                            const { token, title, description, priority } = task
                            return (
                                <Button
                                    key={index}
                                    className={styles.item}
                                    onClick={() => handleDetailsModalOpen(task)}
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
                                                <div className={styles.title}>
                                                    {title}
                                                </div>
                                                <div
                                                    className={
                                                        styles.description
                                                    }
                                                >
                                                    {description.slice(0, 30)}
                                                    {description.length > 30 &&
                                                        "..."}
                                                </div>
                                            </Grid>
                                            <Grid>
                                                <div
                                                    className={styles.priority}
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
                                                <div className={styles.actions}>
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
                                                        onClick={event =>
                                                            onEditTaskClick(
                                                                event,
                                                                task
                                                            )
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
                        })}
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
