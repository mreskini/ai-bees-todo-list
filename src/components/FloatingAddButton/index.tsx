import { FC } from "react"
import { Button, Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import styles from "./FloatingAddButton.module.scss"

type Props = {
    handleOpen(): void
}
const FloatingAddButton: FC<Props> = ({ handleOpen }) => {
    return (
        <Button className={styles.fab} onClick={handleOpen}>
            <Fab color="primary" aria-label="Add new task">
                <AddIcon />
            </Fab>
        </Button>
    )
}

export default FloatingAddButton
