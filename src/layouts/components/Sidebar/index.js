import { FaHome, FaRegHeart } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa6";
import { RiUserFollowLine } from "react-icons/ri";
import { IoMdTrendingUp } from "react-icons/io";
import Button from "../../../components/Button";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../../context";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"



function Sidebar() {
    const LoadingContextValue = useContext(LoadingContext)
    const location = useLocation()
    const [locations, setLocations] = useState()
    const [isShowAddLocation, setIsShowAddLocation] = useState(false)
    const params = useParams()
    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/locations`)
                setLocations(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        getLocations()
    }, [])

    const NAV_ITEMS = [
        {
            locate: 'Hồ Chí Minh',
            time: "09:00",
            tempature: 33,
            description: "Trời nhiều mây",
            coordinates: "T:30 C:30",
            to: '/'
        },
    ]

    const toggleIsShowAddLocation = () => {
        setIsShowAddLocation(!isShowAddLocation)
    }

    const handleOnchange = async (e) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/locations?name=${e.target.value}`)
            setLocations(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sidebar-wrapper text-white fixed w-[232px]">
            <div className="nav overflow-y-auto max-h-[100vh]  flex flex-col gap- px-2 text-[19px] py-[10px] font-sans font-semibold tracking-wide border-b-[1px] border-[#1618231F]">
                <div className="flex justify-between px-2">
                    <h1 className="text-slate-300 text-xs font-semibold">Vị trí</h1>
                    <button style={{ "border-radius": "2px" }} onClick={toggleIsShowAddLocation} className="p-1 rounded-md ring-1 ring-blue-300">
                        <FaPlus className="text-xs text-blue-300" />
                    </button>
                </div>

                {isShowAddLocation && (
                    <div style={{ "border-radius": "2px" }} className="px-2 py-1 mt-2 ring-1 ring-slate-300/40 bg-primary w-full h-10 rounded-md">
                        <input onChange={handleOnchange} type="text" name="name" id="name" placeholder="Nhập quận muốn tìm" className="w-full bg-transparent placeholder:text-sm placeholder:text-slate-200/50 text-slate-200 text-sm leading-5 outline-none" />
                    </div>
                )}

                <Link to={`/`} className="text-slate-300 rounded-lg mt-1">
                    <div className={`item-section mt-1 ${!params.id ? "bg-slate-200/30" : ""} hover:bg-slate-200/10 rounded-lg bg-[#0e468b]  w-full p-2 bg-red}`}>
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <h1 className="text-sm font-semibold tracking-wide text-slate-100">TP. Hồ Chí Minh</h1>
                                <p className="text-[10px] text-slate-100 opacity-70 font-sm tracking-normal"></p>
                            </div>
                            <div className="flex text-[34px] gap-1 text-xl text-slate-100 opacity-70 font-normal">
                                <div>20</div>
                                <div className="mt-1 w-1 h-1 ring-2 ring-offset-0 ring-slate-100 opacity-70 rounded-full"></div>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                            <p className="text-[10px] text-slate-300 opacity-90">Nhiều mây</p>
                            <p className="text-[10px] text-slate-300 opacity-90">T:20 C:30</p>
                        </div>
                    </div>
                    <div className="border-b-[0.5px] border-slate-400/30 mt-1"></div>
                </Link>

                {locations?.map((item, index) => (
                    <Link to={`/${item.id}`} className="text-slate-300 rounded-lg mt-1">
                        <div className={`item-section ${index === 0 ? "mt-1" : ""} ${params.id === item.id ? "bg-slate-200/30   " : ""} hover:bg-slate-200/10 rounded-lg bg-[#0e468b]  w-full p-2 bg-red ${location.pathname === item.to ? 'bg-blue-600 rounded-md' : ''}`}>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <h1 className="text-sm font-semibold tracking-wide text-slate-100">{item.name}</h1>
                                    <p className="text-[10px] text-slate-100 opacity-70 font-sm tracking-normal">{item.time}</p>
                                </div>
                                <div className="flex text-[34px] gap-1 text-xl text-slate-100 opacity-70 font-normal">
                                    <div>20</div>
                                    <div className="mt-1 w-1 h-1 ring-2 ring-offset-0 ring-slate-100 opacity-70 rounded-full"></div>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <p className="text-[10px] text-slate-300 opacity-90">Nhiều mây</p>
                                <p className="text-[10px] text-slate-300 opacity-90">T:20 C:30</p>
                            </div>
                        </div>
                        <div className="border-b-[0.5px] border-slate-400/30 mt-1"></div>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default Sidebar