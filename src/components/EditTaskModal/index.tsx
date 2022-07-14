import { Box, Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { Priority, useTasks } from "../../contexts/TasksContext"
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
