import { Button } from "@mui/material"
import { useState } from "react"
import { useApp } from "../../contexts/AppContext"
import DoneTasksModal from "../DoneTaskModal"
import styles from "./Header.module.scss"

const Header = () => {
    // States and Hooks
    const { tasksList } = useApp()
    const showDoneTasksButton: boolean = tasksList.length > 0
    const [isDoneTasksModalOpen, setIsDoneTaskModalOpen] = useState(false)

    // Methods
    const handleDoneTasksOpen = () => setIsDoneTaskModalOpen(true)
    const handleDoneTasksClose = () => setIsDoneTaskModalOpen(false)

    // Render
    return (
        <>
            <DoneTasksModal
                open={isDoneTasksModalOpen}
                handleClose={handleDoneTasksClose}
            />
            <div className={styles.header}>
                {showDoneTasksButton && (
                    <div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleDoneTasksOpen}
                        >
                            View Done Tasks
                        </Button>
                    </div>
                )}
                <div className={styles.title}>Hello World</div>
                {showDoneTasksButton && <div></div>}
            </div>
        </>
    )
}

export default Header
