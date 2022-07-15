import { Box, Grid, Modal, Paper } from "@mui/material"
import styles from "./DoneTasksModal.module.scss"
import modalStyles from "../../styles/modules/Modal.module.scss"
import taskStyles from "../../styles/modules/Task.module.scss"
import { useTasks } from "../../contexts/TasksContext"
import { useApp } from "../../contexts/AppContext"
import { filterTextLength } from "../../utilities/functions/filterTextLength"
import TaskItem from "../TaskItem"

const DoneTasksModal = () => {
    // States and Hooks
    const { tasksList } = useTasks()
    const { isDoneTasksModalOpen: open, handleDoneTasksClose: handleClose } =
        useApp()
    const doneTasksList = tasksList.filter(task => task.status === "DONE")

    // Methods

    // Render
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Done tasks modal"
                aria-describedby="This modal is used to show the done tasks"
            >
                <Box className={modalStyles.modal}>
                    <div className={modalStyles.subject}>Done Tasks</div>
                    <div>
                        <div className={styles.list}>
                            {doneTasksList.length === 0 && (
                                <div className={styles.label}>
                                    No Done Tasks Found
                                </div>
                            )}
                            {doneTasksList.map(task => {
                                const { token } = task
                                return (
                                    <TaskItem
                                        key={token}
                                        task={task}
                                        hasInteractions={false}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default DoneTasksModal
