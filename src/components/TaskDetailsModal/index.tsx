import { FC } from "react"
import { Box, Modal } from "@mui/material"
import styles from "./TaskDetailsModal.module.scss"

type Props = {
    open: boolean
    handleClose(): void
}

const TaskDetailsModal: FC<Props> = ({ open, handleClose }) => {
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
                </Box>
            </Modal>
        </div>
    )
}

export default TaskDetailsModal
