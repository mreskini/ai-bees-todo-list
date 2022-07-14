import { Button, Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import styles from "./FloatingAddButton.module.scss"
import { useApp } from "../../contexts/AppContext"

const FloatingAddButton = () => {
    // States and Hooks
    const { handleCreateModalOpen } = useApp()

    // Render
    return (
        <Button
            data-testid="fab"
            className={styles.fab}
            onClick={() => handleCreateModalOpen()}
        >
            <Fab color="primary" aria-label="Add new task">
                <AddIcon />
            </Fab>
        </Button>
    )
}

export default FloatingAddButton
