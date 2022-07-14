import { FC } from "react"
import { Box, Modal } from "@mui/material"
import styles from "./TaskDetailsModal.module.scss"
import { Task } from "../../contexts/AppContext"

type Props = {
    open: boolean
    handleClose(): void
    task: Task
}

const TaskDetailsModal: FC<Props> = ({ open, handleClose, task }) => {
    // States and Hooks

    // Render
    return (
        <div className={styles.tasks}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Task details modal"
                aria-describedby="This modal is used to show the task details"
            >
                <Box className={styles.modal}>
                    <div className={styles.subject}>Task Details</div>
                    <div>{task.title}</div>
                </Box>
            </Modal>
        </div>
    )
}

export default TaskDetailsModal
