import {
    Box,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material"
import { FC } from "react"
import { Priority } from "../../contexts/TasksContext"
import styles from "./TaskForm.module.scss"

type Props = {
    title: string
    setTitle(value: string): void
    description: string
    setDescription(value: string): void
    targets: string
    setTargets(value: string): void
    priority: Priority
    setPriority(value: Priority): void
    handleAction(): void
    handleClose(): void
    actionLabel: string
}

const TaskForm: FC<Props> = ({
    title,
    setTitle,
    description,
    setDescription,
    targets,
    setTargets,
    priority,
    setPriority,
    handleAction,
    handleClose,
    actionLabel,
}) => {
    // Methods
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
        <>
            <TextField
                label="Task title"
                className={styles.title}
                variant="outlined"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                label="Task description"
                className={styles.description}
                rows={5}
                multiline
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <TextField
                label="Gift and KPI for this task ;)"
                className={styles.targets}
                variant="outlined"
                value={targets}
                onChange={e => setTargets(e.target.value)}
            />
            <RadioGroup
                row
                aria-labelledby="Task priority"
                className={styles.priority}
                value={getPriorityNumberByName(priority)}
                onChange={e => setPriority(getPriorityByNumber(e.target.value))}
            >
                <FormControlLabel value="1" control={<Radio />} label="Low" />
                <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Medium"
                />
                <FormControlLabel value="3" control={<Radio />} label="High" />
            </RadioGroup>
            <Box className={styles.actions}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                    data-testid="modal-cancel"
                >
                    cancel
                </Button>
                <Button variant="contained" onClick={handleAction}>
                    {actionLabel}
                </Button>
            </Box>
        </>
    )
}

export default TaskForm
