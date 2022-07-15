import { Alert, Box, Modal, Typography } from "@mui/material"
import { useState } from "react"
import { Priority, useTasks } from "../../contexts/TasksContext"
import modalStyles from "../../styles/modules/Modal.module.scss"
import { useApp } from "../../contexts/AppContext"
import TaskForm from "../TaskForm"
import * as yup from "yup"

const CreateTaskModal = () => {
    // States and Hooks
    const { addNewTask } = useTasks()
    const { isCreateModalOpen: open, handleCreateModalClose: handleClose } =
        useApp()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [targets, setTargets] = useState<string>("")
    const [priority, setPriority] = useState<Priority>("LOW")
    const [error, setError] = useState<string>("")

    // Methods
    const resetForm = () => {
        setTitle("")
        setDescription("")
        setTargets("")
        setPriority("LOW")
    }

    const addToTasksButtonClicked = () => {
        setError("")
        CreateTaskFormSchema.validate({
            priority,
            targets,
            description,
            title,
        })
            .then(() => {
                addNewTask(title, description, targets, priority, "OPEN")
                resetForm()
                handleClose()
            })
            .catch(error => setError(error.errors[0]))
    }

    // Render
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Create task modal"
                aria-describedby="This modal is used to create new tasks"
            >
                <Box className={modalStyles.modal}>
                    <div
                        data-testid="modal-title"
                        className={modalStyles.subject}
                    >
                        Create New Task
                    </div>

                    {error && (
                        <Box marginBottom={"15px"}>
                            <Alert severity="error">
                                <Typography textTransform={"capitalize"}>
                                    {error}
                                </Typography>
                            </Alert>
                        </Box>
                    )}
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
                        actionLabel="Create New Task"
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default CreateTaskModal

const CreateTaskFormSchema = yup.object().shape({
    priority: yup.string().required(),
    targets: yup.string().required(),
    description: yup.string().min(10).required(),
    title: yup.string().min(5).required(),
})
