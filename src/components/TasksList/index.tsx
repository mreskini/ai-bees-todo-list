import { Button, Grid } from "@mui/material"
import { useApp } from "../../contexts/AppContext"
import { useTasks } from "../../contexts/TasksContext"
import CreateTaskModal from "../CreateTaskModal"
import EditTaskModal from "../EditTaskModal"
import FloatingAddButton from "../FloatingAddButton"
import TaskDetailsModal from "../TaskDetailsModal"
import TaskItem from "../TaskItem"
import styles from "./TasksList.module.scss"

const TasksList = () => {
    // States and Hooks
    const { tasksList } = useTasks()
    const { handleCreateModalOpen } = useApp()
    const openTasksList = tasksList.filter(task => task.status === "OPEN")
    const showTasksList = openTasksList.length > 0

    //   Render
    return (
        <div className={styles.tasks}>
            <CreateTaskModal />
            <TaskDetailsModal />
            <EditTaskModal />

            {showTasksList ? (
                <Grid container alignItems="center" justifyContent="center">
                    <Grid xs={8}>
                        {openTasksList.map((task, index) => {
                            return <TaskItem task={task} key={index} />
                        })}
                    </Grid>
                    <FloatingAddButton />
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
