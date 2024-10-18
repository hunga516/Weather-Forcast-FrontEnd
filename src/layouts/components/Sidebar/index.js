import { FaHome, FaRegHeart } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa6";
import { RiUserFollowLine } from "react-icons/ri";
import { IoMdTrendingUp } from "react-icons/io";
import Button from "../../../components/Button";
import { useContext } from "react";
import { LoadingContext } from "../../../context";

function Sidebar() {
    const LoadingContextValue = useContext(LoadingContext)

    const NAV_ITEMS = [
        {
            icon: RiUserFollowLine,
            locate: 'Hồ Chí Minh',
            time: "09:00",
            tempature: 33,
            description: "Trời nhiều mây",
            coordinates: "T:30 C:30"
        },
        {
            icon: FaRegCompass,
            locate: 'Đà Lạt',
            tempature: 17,
            description: "Mưa rào",
            time: "09:00",
            coordinates: "T:20 C:30",
        },
        {
            icon: FaRegHeart,
            locate: 'Đà Nẵng',
            tempature: 34,
            description: "Nắng gắt",
            time: "09:00",
            coordinates: "T:26 C:30"
        }
    ]

    return (
        <div className="sidebar-wrapper text-white fixed mt-[60px] w-[232px]">
            <div className="nav flex flex-col gap- px-2 text-[19px] py-[10px] font-sans font-semibold tracking-wide border-b-[1px] border-[#1618231F]">
                {NAV_ITEMS.map((item, index) => (
                    <div className="item-section bg-[#0e468b] w-full p-2 bg-red">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <h1 className="text-sm font-semibold tracking-wide">{item.locate}</h1>
                                <p className="text-[10px] text-slate-100 opacity-70 font-sm tracking-normal">{item.time}</p>
                            </div>
                            <div className="flex text-[34px] gap-1 text-xl text-slate-100 opacity-70 font-normal">
                                <div>{item.tempature}</div>
                                <div className="mt-1 w-1 h-1 ring-2 ring-offset-0 ring-slate-100 opacity-70 rounded-full"></div>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                            <p className="text-[10px] text-slate-300 opacity-70">{item.description}</p>
                            <p className="text-[10px] text-slate-300 opacity-70">{item.coordinates}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar