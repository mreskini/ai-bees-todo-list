import { FC } from "react"
import { Box, Button, Modal } from "@mui/material"
import styles from "./TaskDetailsModal.module.scss"
import { Task } from "../../contexts/AppContext"

type Props = {
    open: boolean
    handleClose(): void
    task: Task
}

const TaskDetailsModal: FC<Props> = ({ open, handleClose, task }) => {
    // States and Hooks
    const { title, description, targets, priority, status } = task

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
                    <div className={styles.title}>
                        <div>
                            Title: {title} ({priority})
                        </div>
                    </div>
                    <div className={styles.description}>
                        Description:
                        <div>{description}</div>
                    </div>
                    <div className={styles.actions}>
                        <Button variant="contained" color="info">
                            Edit Task
                        </Button>
                        <Button variant="contained" color="success">
                            Done Task
                        </Button>
                        <Button variant="contained" color="error">
                            Delete Task
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default TaskDetailsModal
