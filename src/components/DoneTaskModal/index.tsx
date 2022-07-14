import { FC } from "react"
import { Box, Modal } from "@mui/material"
import styles from "./DoneTasksModal.module.scss"
import { useApp } from "../../contexts/AppContext"

type Props = {
    open: boolean
    handleClose(): void
}

const DoneTasksModal: FC<Props> = ({ open, handleClose }) => {
    // States and Hooks
    const { tasksList } = useApp()
    const doneTasksList = tasksList.filter(task => task.status === "DONE")

    // Methods

    // Render
    return (
        <div className={styles.tasks}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Done tasks modal"
                aria-describedby="This modal is used to show the done tasks"
            >
                <Box className={styles.modal}>
                    <div className={styles.subject}>Done Tasks</div>
                    <div>
                        {doneTasksList.length === 0 && (
                            <div>No Done Tasks Found</div>
                        )}
                        {doneTasksList.map(task => {
                            return <div key={task.token}>{task.title}</div>
                        })}
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default DoneTasksModal
