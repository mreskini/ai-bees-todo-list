import Header from "./components/Header"
import TasksList from "./components/TasksList"
import styles from "./App.module.scss"

const App = () => {
    return (
        <div className={styles.app}>
            <Header />
            <TasksList />
        </div>
    )
}

export default App
