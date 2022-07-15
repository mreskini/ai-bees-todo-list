import { Alert, Box, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Priority, useTasks } from "../../contexts/TasksContext"
import modalStyles from "../../styles/modules/Modal.module.scss"
import { useApp } from "../../contexts/AppContext"
import TaskForm from "../TaskForm"
import * as yup from "yup"

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
    const [error, setError] = useState<string>("")

    // Methods
    const editTaskButtonClick = () => {
        setError("")
        CreateTaskFormSchema.validate({
            priority,
            targets,
            description,
            title,
        })
            .then(() => {
                editTask(task.token, title, description, targets, priority)
                handleClose()
            })
            .catch(error => setError(error.errors))
    }

    useEffect(() => {
        setTitle(task.title)
        setDescription(task.description)
        setTargets(task.targets)
        setPriority(task.priority)
        setError("")
    }, [task])

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
                    <div className={modalStyles.subject}>Edit Task</div>
                    {/*
                        Using Props at this section is better, because by using Context API,
                        I need to create two context apis + two create and edit forms (with the same UI (more boilerplate code))
                        (One for Create Modal and One for the Edit Modal, and because of using ts, there will be lots of unwanted boilerplate codes)
                        So, I decided to use Props (though this might cause to prop plowing, but it's the better way to use here)
                    */}
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
                        handleAction={editTaskButtonClick}
                        handleClose={handleClose}
                        actionLabel="Edit Task"
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default EditTaskModal

const CreateTaskFormSchema = yup.object().shape({
    priority: yup.string().required(),
    targets: yup.string().required(),
    description: yup.string().min(10).required(),
    title: yup.string().min(5).required(),
})
