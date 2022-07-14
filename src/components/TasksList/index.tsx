import { Button, Grid } from "@mui/material"
import { useApp } from "../../contexts/AppContext"
import { Task, useTasks } from "../../contexts/TasksContext"
import CreateTaskModal from "../CreateTaskModal"
import EditTaskModal from "../EditTaskModal"
import FloatingAddButton from "../FloatingAddButton"
import TaskDetailsModal from "../TaskDetailsModal"
import TaskItem from "../TaskItem"
import styles from "./TasksList.module.scss"

const TasksList = () => {
    // States and Hooks
    const { tasksList } = useTasks()
    const {
        isDetailsModalOpen,
        isCreateModalOpen,
        isEditModalOpen,
        currentTask,

        handleCreateModalOpen,
        handleCreateModalClose,
        handleDetailsModalClose,
        handleEditModalOpen,
        handleEditModalClose,
    } = useApp()
    const openTasksList = tasksList.filter(task => task.status === "OPEN")
    const showTasksList = openTasksList.length > 0

    // Methods
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
                            return <TaskItem task={task} key={index} />
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
