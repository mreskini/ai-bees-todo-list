import {
    Box,
    Button,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material"
import { FC } from "react"
import styles from "./CreateTaskModal.module.scss"

type Props = {
    open: boolean
    handleClose: () => any
}

const CreateTaskModal: FC<Props> = ({ open, handleClose }) => {
    return (
        <div className={styles.tasks}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Create task modal"
                aria-describedby="This modal is used to create new tasks"
            >
                <Box className={styles.modal}>
                    <Typography className={styles.subject}>
                        Create New Task
                    </Typography>
                    <TextField
                        label="Task title"
                        className={styles.title}
                        variant="outlined"
                    />
                    <TextField
                        label="Task description"
                        className={styles.description}
                        rows={5}
                        multiline
                    />
                    <TextField
                        label="Gift and KPI for this task ;)"
                        className={styles.targets}
                        variant="outlined"
                    />
                    <RadioGroup
                        row
                        aria-labelledby="Task priority"
                        className={styles.priority}
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
                        <Button variant="contained" onClick={handleClose}>
                            Add to Tasks
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateTaskModal
