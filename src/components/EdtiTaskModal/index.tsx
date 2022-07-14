import {
    Box,
    Button,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material"
import { FC, useState } from "react"
import { Priority, Task, useApp } from "../../contexts/AppContext"
import styles from "./EditTaskModal.module.scss"

type Props = {
    open: boolean
    handleClose(): void
    task: Task
}

const EditTaskModal: FC<Props> = ({ open, handleClose, task }) => {
    // States and Hooks
    const { editTask } = useApp()
    const [titleValue, setTitleValue] = useState<string>(task.title)
    const [descriptionValue, setDescriptionValue] = useState<string>(
        task.description
    )
    const [targetsValue, setTargetsValue] = useState<string>(task.targets)
    const [taskPriority, setTaskPriority] = useState<Priority>(task.priority)

    // Methods
    const resetForm = () => {
        setTitleValue("")
        setDescriptionValue("")
        setTargetsValue("")
        setTaskPriority("LOW")
    }

    const addToTasksButtonClicked = () => {
        editTask(
            task.token,
            titleValue,
            descriptionValue,
            targetsValue,
            taskPriority
        )
        resetForm()
        handleClose()
    }

    const getPriorityByNumber = (number: string) => {
        if (number === "1") return "LOW"
        if (number === "2") return "MEDIUM"
        if (number === "3") return "HIGH"

        return "LOW"
    }

    const getPriorityNumberByName = (name: string): string => {
        if (name === "LOW") return "1"
        if (name === "MEDIUM") return "2"
        if (name === "HIGH") return "3"

        return "1"
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
                <Box className={styles.modal}>
                    <div className={styles.subject}>Edit Task</div>
                    <TextField
                        label="Task title"
                        className={styles.title}
                        variant="outlined"
                        value={titleValue}
                        onChange={e => setTitleValue(e.target.value)}
                    />
                    <TextField
                        label="Task description"
                        className={styles.description}
                        rows={5}
                        multiline
                        value={descriptionValue}
                        onChange={e => setDescriptionValue(e.target.value)}
                    />
                    <TextField
                        label="Gift and KPI for this task ;)"
                        className={styles.targets}
                        variant="outlined"
                        value={targetsValue}
                        onChange={e => setTargetsValue(e.target.value)}
                    />
                    <RadioGroup
                        row
                        aria-labelledby="Task priority"
                        className={styles.priority}
                        value={getPriorityNumberByName(taskPriority)}
                        onChange={e =>
                            setTaskPriority(getPriorityByNumber(e.target.value))
                        }
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Low"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Medium"
                        />
                        <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="High"
                        />
                    </RadioGroup>
                    <Box className={styles.actions}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={addToTasksButtonClicked}
                        >
                            Edit Task
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default EditTaskModal
