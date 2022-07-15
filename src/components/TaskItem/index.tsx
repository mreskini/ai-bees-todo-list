import { Button, Grid, Paper } from "@mui/material"
import { FC, MouseEvent } from "react"
import { useApp } from "../../contexts/AppContext"
import { Task, useTasks } from "../../contexts/TasksContext"
import taskStyles from "../../styles/modules/Task.module.scss"
import { filterTextLength } from "../../utilities/functions/filterTextLength"

type Props = {
    task: Task
    hasInteractions: boolean
}

const TaskItem: FC<Props> = ({ task, hasInteractions }) => {
    // States and Hooks
    const { token, title, description, priority } = task
    const { doneTaskByToken } = useTasks()
    const { handleDetailsModalOpen, handleEditModalOpen } = useApp()

    // Methods
    const onDoneTaskClick = (
        event: MouseEvent<HTMLButtonElement>,
        token: string
    ): void => {
        doneTaskByToken(token)
        event.stopPropagation()
    }
    const onEditTaskClick = (
        event: MouseEvent<HTMLButtonElement>,
        task: Task
    ): void => {
        event.stopPropagation()
        handleEditModalOpen(task)
    }

    // Render
    return (
        <Button
            className={taskStyles.item}
            onClick={
                hasInteractions ? () => handleDetailsModalOpen(task) : undefined
            }
        >
            <Paper variant="outlined" className={taskStyles["item-inner"]}>
                <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid>
                        <div className={taskStyles.title}>
                            {filterTextLength(title)}
                        </div>
                        <div className={taskStyles.description}>
                            {filterTextLength(description)}
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
                        {hasInteractions && (
                            <div className={taskStyles.actions}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={event =>
                                        onDoneTaskClick(event, token)
                                    }
                                >
                                    Done Task
                                </Button>
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={event =>
                                        onEditTaskClick(event, task)
                                    }
                                >
                                    Edit Task
                                </Button>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Button>
    )
}

export default TaskItem
