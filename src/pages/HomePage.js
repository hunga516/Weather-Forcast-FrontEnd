
import axios from "axios";
import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdUmbrella } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

function HomePage() {
    const [predict, setPredict] = useState()
    const params = useParams()

    console.log(params.id);

    useEffect(() => {
        const getPredict = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/predict")
                setPredict(response.data.predictions)
            } catch (error) {
                console.log(error);
            }
        }

        const getPredictByLocation = async () => {
            const data = {
                "dwpt": 26.5,
                "rhum": 95.0,
                "wspd": 7.6,
                "pres": 1010.5
            }
            try {
                const response = await axios.post(`http://127.0.0.1:5000/predict_district/${params.id}`, data)
                setPredict(response.data.predictions)
            } catch (error) {
                console.log(error);
            }
        }

        if (params?.id) {
            getPredictByLocation()
        } else {
            getPredict()
        }

    }, [params])


    const formatHour = (time) => {
        const date = new Date(time);
        const hours = date.getHours();
        return `${hours} giờ`;
    };

    const getWeekday = (time) => {
        const weekdays = ["CN", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"];
        const date = new Date(time);
        return weekdays[date.getDay()];
    };


    return (
        <div className="pb-[1000px] p-1 px-20 object-cover bg-[url(https://images.pexels.com/photos/695657/pexels-photo-695657.jpeg?cs=srgb&dl=pexels-ironic-695657.jpg&fm=jpg)]">
            <div className="flex mt-20 flex-col items-center text-white">
                <h1 className="text-2xl">TP. Hồ Chí Minh</h1>
                <p className="text-[60px] leading-[50px] font-thin font-sans">31</p>
                <p className="text font-medium">Trời nhiều mây</p>
                <p>T:30 C:30</p>
            </div>

            <div className="mt-20 p-2 max-w-[800px] overflow-x-auto mx-auto rounded-md w-full overflow-hidden bg-slate-600/70">
                <p className="text-[10px] tracking-wide text-white font-sans">Dự báo có mưa rào vài nơi vào 1 tiếng sau</p>
                <p className="mt-2 h-[1px] w-full bg-white bg-opacity-35"></p>

                <div className="mt-4 flex flex-row gap-8 items-center overflow-x-scroll">
                    {predict ? (
                        predict.map((item, index) => (
                            <div className="flex flex-col gap-4 justify-between items-center">
                                <h1 className="text-white text-[12px] font-semibold font-sans text-nowrap">{formatHour(item.time)}</h1>
                                <img src="https://cdn-icons-png.flaticon.com/512/252/252035.png" className="w-6 h-6" />
                                <div className="text-white relative">
                                    {Math.round(item.temperature)}
                                    <div className="absolute -right-1 top-0 w-1 h-1 rounded-full ring-1 ring-white"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                            <Skeleton width={30} height={80} />
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 max-w-[800px] mx-auto  gap-4 w-full rounded-md ">
                <div className="p-2 bg-slate-600/70 mt-8 rounded-md">
                    <p className="flex gap-1 items-center text-[12px] text-slate-200/80">
                        <CiCalendarDate />
                        Dự báo thời tiết 10 ngày sau
                    </p>
                    <p className="mt-2 h-[1px] w-full bg-white bg-opacity-35"></p>

                    <div className="max-h-[395px] overflow-y-auto">
                        <div className="flex items-center gap-4 mt-2">
                            <h1 className="text-base text-white text-nowrap">Hôm nay</h1>
                            <div className="flex flex-col justify-center items-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/252/252035.png" className="w-4 h-4" />
                                <p className="text-[#5bc7f5] text-xs font-semibold">55%</p>
                            </div>
                            <p className="text-white/60">25</p>
                            <div className="rounded-full w-80 h-1 bg-slate-300">
                                <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full w-[20%] h-1"></div>
                            </div>
                        </div>

                        {predict ? (
                            predict.map((item, index) => {
                                if (formatHour(item.time) === '0 giờ') {
                                    return (
                                        <div key={index} className="flex items-center gap-4 mt-2">
                                            <h1 className="text-base text-white text-nowrap">{getWeekday(item.time)}</h1>
                                            <div className="flex flex-col justify-center items-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/252/252035.png" className="w-4 h-4" />
                                                <p className="text-[#5bc7f5] text-xs font-semibold">{Math.round(item.temperature / 40 * 100)}%</p>
                                            </div>
                                            <p className="text-white/60">25</p>
                                            <div className="rounded-full w-80 h-1 bg-slate-300">
                                                <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full w-[20%] h-1"></div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <>
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                                <Skeleton width={379} height={40} />
                            </>
                        )}
                    </div>
                </div>
                <div className="p-2 bg-slate-600/70 mt-8 rounded-md">
                    <p className="flex gap-1 items-center text-[12px] text-slate-200/80">
                        <IoMdUmbrella />
                        Lượng mưa
                    </p>
                    <p className="mt-2 h-[1px] w-full bg-white bg-opacity-35"></p>

                    <div className="mt-4">
                        <img
                            className="rounded-sm object-cover w-full h-[380px]"
                            src="https://images2.thanhnien.vn/528068263637045248/2024/4/7/screenshot-2024-04-07-at-85035-am-1712454901868992967871.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage