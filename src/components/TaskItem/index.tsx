import { Button, Grid, Paper } from "@mui/material"
import { FC } from "react"
import { useApp } from "../../contexts/AppContext"
import { Task, useTasks } from "../../contexts/TasksContext"
import taskStyles from "../../styles/modules/Task.module.scss"

type Props = {
    task: Task
}

const TaskItem: FC<Props> = ({ task }) => {
    // States and Hooks
    const { token, title, description, priority } = task
    const { doneTaskByToken } = useTasks()
    const { handleDetailsModalOpen, handleEditModalOpen } = useApp()

    // Methods
    const onDoneTaskClick = (event: any, token: string): void => {
        doneTaskByToken(token)
        event.stopPropagation()
    }
    const onEditTaskClick = (event: any, task: Task): void => {
        event.stopPropagation()
        handleEditModalOpen(task)
    }

    // Render
    return (
        <Button
            className={taskStyles.item}
            onClick={() => handleDetailsModalOpen(task)}
        >
            <Paper
                variant="outlined"
                elevation={1}
                className={taskStyles["item-inner"]}
            >
                <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid>
                        <div className={taskStyles.title}>{title}</div>
                        <div className={taskStyles.description}>
                            {description.slice(0, 30)}
                            {description.length > 30 && "..."}
                        </div>
                    </Grid>
                    <Grid>
                        <div className={taskStyles.priority}>
                            <div>{priority}</div>
                            <div
                                className={`${taskStyles.bullet} ${
                                    taskStyles[
                                        priority === "HIGH"
                                            ? "bullet-high"
                                            : priority === "MEDIUM"
                                            ? "bullet-mid"
                                            : "bullet-low"
                                    ]
                                }`}
                            ></div>
                        </div>
                        <div className={taskStyles.actions}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={event => onDoneTaskClick(event, token)}
                            >
                                Done Task
                            </Button>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={event => onEditTaskClick(event, task)}
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

export default TaskItem
