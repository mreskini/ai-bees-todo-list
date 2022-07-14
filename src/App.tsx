import Header from "./components/Header"
import TasksList from "./components/TasksList"
import styles from "./App.module.scss"
import TasksProvider from "./contexts/TasksContext"
import AppProvider from "./contexts/AppContext"

const App = () => {
    return (
        <TasksProvider>
            <AppProvider>
                <div className={styles.app}>
                    <Header />
                    <TasksList />
                </div>
            </AppProvider>
        </TasksProvider>
    )
}

export default App
