import { Box, Button, Modal } from "@mui/material"
import styles from "./TaskDetailsModal.module.scss"
import modalStyles from "../../styles/modules/Modal.module.scss"
import { Task, useTasks } from "../../contexts/TasksContext"
import { useApp } from "../../contexts/AppContext"
import { filterTextLength } from "../../utilities/functions/filterTextLength"

const TaskDetailsModal = () => {
    // States and Hooks
    const { doneTaskByToken, deleteTaskByToken } = useTasks()
    const {
        currentTask: task,
        isDetailsModalOpen: open,
        handleDetailsModalClose: handleClose,
        handleEditModalOpen,
    } = useApp()
    const { token, title, description, priority } = task

    // Methods
    const onDoneTaskButtonClick = () => {
        doneTaskByToken(token)
        handleClose()
    }

    const onDeleteTaskButtonClick = () => {
        deleteTaskByToken(token)
        handleClose()
    }

    const editClick = (task: Task): void => {
        handleEditModalOpen(task)
    }

    // Render
    return (
        <div className={styles.tasks}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Task details modal"
                aria-describedby="This modal is used to show the task details"
            >
                <Box className={modalStyles.modal}>
                    <div className={modalStyles.subject}>Task Details</div>
                    <div className={styles.title}>
                        <div>
                            Title: {filterTextLength(title)} ({priority})
                        </div>
                    </div>
                    <div className={styles.description}>
                        Description:
                        <div>{description}</div>
                    </div>
                    <div className={styles.actions}>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={() => editClick(task)}
                        >
                            Edit Task
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={onDoneTaskButtonClick}
                        >
                            Done Task
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={onDeleteTaskButtonClick}
                        >
                            Delete Task
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default TaskDetailsModal
