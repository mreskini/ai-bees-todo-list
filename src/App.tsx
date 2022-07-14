import Header from "./components/Header"
import TasksList from "./components/TasksList"
import styles from "./App.module.scss"
import TasksProvider from "./contexts/TasksContext"

const App = () => {
    return (
        <TasksProvider>
            <div className={styles.app}>
                <Header />
                <TasksList />
            </div>
        </TasksProvider>
    )
}

export default App
