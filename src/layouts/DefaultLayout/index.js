import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

function DefaultLayout({ children }) {
    return (
        <div>
            <div className="wrapper flex justify-center w-full">
                <div className="w-[232px] pb-[800px] bg-[#0e468b]">
                    <Sidebar />
                </div>
                <div className="content flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout