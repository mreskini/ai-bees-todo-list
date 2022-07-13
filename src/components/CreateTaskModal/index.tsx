import { Box, Modal, Typography } from "@mui/material"
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
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Text in a modal
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateTaskModal
