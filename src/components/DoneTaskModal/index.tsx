import { Box, Grid, Modal, Paper } from "@mui/material"
import styles from "./DoneTasksModal.module.scss"
import modalStyles from "../../styles/modules/Modal.module.scss"
import taskStyles from "../../styles/modules/Task.module.scss"
import { useTasks } from "../../contexts/TasksContext"
import { useApp } from "../../contexts/AppContext"
import { filterTextLength } from "../../utilities/functions/filterTextLength"

const DoneTasksModal = () => {
    // States and Hooks
    const { tasksList } = useTasks()
    const { isDoneTasksModalOpen: open, handleDoneTasksClose: handleClose } =
        useApp()
    const doneTasksList = tasksList.filter(task => task.status === "DONE")

    // Methods

    // Render
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Done tasks modal"
                aria-describedby="This modal is used to show the done tasks"
            >
                <Box className={modalStyles.modal}>
                    <div className={modalStyles.subject}>Done Tasks</div>
                    <div>
                        <div className={styles.list}>
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
                                                padding={"2%"}
                                            >
                                                <Grid>
                                                    <div
                                                        className={
                                                            taskStyles.title
                                                        }
                                                    >
                                                        {filterTextLength(
                                                            title
                                                        )}
                                                    </div>
                                                    <div
                                                        className={
                                                            taskStyles.description
                                                        }
                                                    >
                                                        {filterTextLength(
                                                            description
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid>
                                                    <div
                                                        className={
                                                            taskStyles.priority
                                                        }
                                                    >
                                                        <div>{priority}</div>
                                                        <div
                                                            className={`${
                                                                taskStyles.bullet
                                                            } ${
                                                                taskStyles[
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
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default DoneTasksModal
