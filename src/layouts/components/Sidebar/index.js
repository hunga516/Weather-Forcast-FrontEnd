import { FaHome, FaRegHeart } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa6";
import { RiUserFollowLine } from "react-icons/ri";
import { IoMdTrendingUp } from "react-icons/io";
import Button from "../../../components/Button";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../../context";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";

function Sidebar() {
    const LoadingContextValue = useContext(LoadingContext)
    const location = useLocation()
    const [locations, setLocations] = useState()
    const [isShowAddLocation, setIsShowAddLocation] = useState(false)

    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/locations`)
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

    return (
        <div className="sidebar-wrapper text-white fixed w-[232px]">
            <div className="nav overflow-y-auto max-h-[100vh] flex flex-col gap- px-2 text-[19px] py-[10px] font-sans font-semibold tracking-wide border-b-[1px] border-[#1618231F]">
                <div className="flex justify-between px-2">
                    <h1 className="text-slate-300 text-xs font-semibold">Vị trí</h1>
                    <button onClick={toggleIsShowAddLocation} className="p-1 rounded-sm ring-1 ring-blue-300">
                        <FaPlus className="text-xs text-blue-300" />
                    </button>
                </div>

                {isShowAddLocation && (
                    <div className="p-1 mt-2 ring-1 ring-slate-300 w-full h-10 rounded-md">
                        <select name="name" id="name" className="">
                            <option value="Q2">Quận 2</option>
                            <option value="Q2">Quận 2</option>
                            <option value="Q2">Quận 2</option>
                            <option value="Q2">Quận 2</option>
                            <option value="Q2">Quận 2</option>
                            <option value="Q2">Quận 2</option>
                        </select>
                    </div>
                )}

                {locations?.map((item, index) => (
                    <div className={`item-section ${index === 0 ? "mt-1" : ""} bg-[#0e468b] border-b-[0.5px] border-slate-400 w-full p-2 bg-red ${location.pathname === item.to ? 'bg-blue-600 rounded-md' : ''}`}>
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <h1 className="text-sm font-semibold tracking-wide">{item.name}</h1>
                                <p className="text-[10px] text-slate-100 opacity-70 font-sm tracking-normal">{item.time}</p>
                            </div>
                            <div className="flex text-[34px] gap-1 text-xl text-slate-100 opacity-70 font-normal">
                                <div>20</div>
                                <div className="mt-1 w-1 h-1 ring-2 ring-offset-0 ring-slate-100 opacity-70 rounded-full"></div>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                            <p className="text-[10px] text-slate-300 opacity-70">Nhieu may</p>
                            <p className="text-[10px] text-slate-300 opacity-70">T30 C20</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar