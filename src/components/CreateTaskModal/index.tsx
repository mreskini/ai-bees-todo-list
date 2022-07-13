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
import { useApp } from "../../contexts/AppContext"
import styles from "./CreateTaskModal.module.scss"

type Props = {
    open: boolean
    handleClose(): void
}

const CreateTaskModal: FC<Props> = ({ open, handleClose }) => {
    // States and Hooks
    const { addNewTask } = useApp()
    const [titleValue, setTitleValue] = useState<string>("")
    const [descriptionValue, setDescriptionValue] = useState<string>("")
    const [targetsValue, setTargetsValue] = useState<string>("")
    const [taskPriority, setTaskPriority] = useState<string>("")

    // Methods
    const addToTasksButtonClicked = () => {
        addNewTask(titleValue, descriptionValue, targetsValue, taskPriority)
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
                <Box className={styles.modal}>
                    <div className={styles.subject}>Create New Task</div>
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
                        value={taskPriority}
                        onChange={e => setTaskPriority(e.target.value)}
                    >
                        <FormControlLabel
                            value="low"
                            control={<Radio />}
                            label="Low"
                        />
                        <FormControlLabel
                            value="medium"
                            control={<Radio />}
                            label="Medium"
                        />
                        <FormControlLabel
                            value="hight"
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
                            Add to Tasks
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateTaskModal
