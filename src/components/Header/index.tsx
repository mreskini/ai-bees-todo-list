import { Button } from "@mui/material"
import { useApp } from "../../contexts/AppContext"
import { useTasks } from "../../contexts/TasksContext"
import DoneTasksModal from "../DoneTaskModal"
import styles from "./Header.module.scss"

const Header = () => {
    // States and Hooks
    const { tasksList } = useTasks()
    const { isDoneTasksModalOpen, handleDoneTasksClose, handleDoneTasksOpen } =
        useApp()
    const showDoneTasksButton: boolean = tasksList.length > 0

    // Render
    return (
        <>
            <DoneTasksModal />
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
