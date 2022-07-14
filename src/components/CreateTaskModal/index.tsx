import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { Priority, useTasks } from "../../contexts/TasksContext"
import styles from "./CreateTaskModal.module.scss"
import modalStyles from "../../styles/modules/Modal.module.scss"
import { useApp } from "../../contexts/AppContext"
import TaskForm from "../TaskForm"

const CreateTaskModal = () => {
    // States and Hooks
    const { addNewTask } = useTasks()
    const { isCreateModalOpen: open, handleCreateModalClose: handleClose } =
        useApp()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [targets, setTargets] = useState<string>("")
    const [priority, setPriority] = useState<Priority>("LOW")

    // Methods
    const resetForm = () => {
        setTitle("")
        setDescription("")
        setTargets("")
        setPriority("LOW")
    }

    const addToTasksButtonClicked = () => {
        addNewTask(title, description, targets, priority, "OPEN")
        resetForm()
        handleClose()
    }

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
                    <div className={modalStyles.subject}>Create New Task</div>
                    <TaskForm
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        targets={targets}
                        setTargets={setTargets}
                        priority={priority}
                        setPriority={setPriority}
                        handleAction={addToTasksButtonClicked}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default CreateTaskModal
