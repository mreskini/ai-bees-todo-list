import { Box, Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { Priority, useTasks } from "../../contexts/TasksContext"
import styles from "./EditTaskModal.module.scss"
import modalStyles from "../../styles/modules/Modal.module.scss"
import { useApp } from "../../contexts/AppContext"
import TaskForm from "../TaskForm"

const EditTaskModal = () => {
    // States and Hooks
    const { editTask } = useTasks()
    const {
        isEditModalOpen: open,
        handleEditModalClose: handleClose,
        currentTask: task,
    } = useApp()

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [targets, setTargets] = useState<string>("")
    const [priority, setPriority] = useState<Priority>("LOW")

    // Methods
    const editTaskButtonClick = () => {
        editTask(task.token, title, description, targets, priority)
        handleClose()
    }

    useEffect(() => {
        setTitle(task.title)
        setDescription(task.description)
        setTargets(task.targets)
        setPriority(task.priority)
    }, [task])

    // Render
    return (
        <div className={styles.tasks}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Create task modal"
                aria-describedby="This modal is used to create new tasks"
            >
                <Box className={modalStyles.modal}>
                    <div className={modalStyles.subject}>Edit Task</div>
                    <TaskForm
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        targets={targets}
                        setTargets={setTargets}
                        priority={priority}
                        setPriority={setPriority}
                        handleAction={editTaskButtonClick}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default EditTaskModal
