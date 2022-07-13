import { Modal } from "@mui/material"
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
                <div>Foobar is here</div>
            </Modal>
        </div>
    )
}

export default CreateTaskModal
