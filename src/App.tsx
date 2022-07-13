import Header from "./components/Header"
import TasksList from "./components/TasksList"
import styles from "./App.module.scss"
import AppProvider from "./contexts/AppContext"

const App = () => {
    return (
        <AppProvider>
            <div className={styles.app}>
                <Header />
                <TasksList />
            </div>
        </AppProvider>
    )
}

export default App
