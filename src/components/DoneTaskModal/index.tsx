import { FC } from "react"
import { Box, Button, Grid, Modal, Paper } from "@mui/material"
import styles from "./DoneTasksModal.module.scss"
import { useApp } from "../../contexts/AppContext"

type Props = {
    open: boolean
    handleClose(): void
}

const DoneTasksModal: FC<Props> = ({ open, handleClose }) => {
    // States and Hooks
    const { tasksList } = useApp()
    const doneTasksList = tasksList.filter(task => task.status === "DONE")

    // Methods

    // Render
    return (
        <div className={styles.tasks}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Done tasks modal"
                aria-describedby="This modal is used to show the done tasks"
            >
                <Box className={styles.modal}>
                    <div className={styles.subject}>Done Tasks</div>
                    <div>
                        {doneTasksList.length === 0 && (
                            <div className={styles.label}>
                                No Done Tasks Found
                            </div>
                        )}
                        {doneTasksList.map(
                            ({ token, title, description, priority }) => {
                                return (
                                    <Paper
                                        variant="outlined"
                                        elevation={1}
                                        key={token}
                                        className={styles.item}
                                    >
                                        <Grid
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid>
                                                <div className={styles.title}>
                                                    {title}
                                                </div>
                                                <div
                                                    className={
                                                        styles.description
                                                    }
                                                >
                                                    {description.slice(0, 30)}
                                                    {description.length > 30 &&
                                                        "..."}
                                                </div>
                                            </Grid>
                                            <Grid>
                                                <div
                                                    className={styles.priority}
                                                >
                                                    <div>{priority}</div>
                                                    <div
                                                        className={`${
                                                            styles.bullet
                                                        } ${
                                                            styles[
                                                                priority ===
                                                                "HIGH"
                                                                    ? "bullet-high"
                                                                    : priority ===
                                                                      "MEDIUM"
                                                                    ? "bullet-mid"
                                                                    : "bullet-low"
                                                            ]
                                                        }`}
                                                    ></div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default DoneTasksModal
