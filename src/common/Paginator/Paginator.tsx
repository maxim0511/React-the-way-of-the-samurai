import React, { useEffect, useState } from "react";
import s from "./Paginator.module.css";

type PropsType = {
    totalUsersCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged: (pages:number)=>void, 
    portionsize?:number
}

let Paginator:React.FC<PropsType> =({totalUsersCount,pageSize,currentPage,onPageChanged, portionsize=10}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages:Array<number>= [];
    for (let i=1; i<=pagesCount; i++) {
        pages.push(i);
    }
    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionsize)), [currentPage]);
    let portionCount= Math.ceil(pagesCount/portionsize);
    let [portionNumber,setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionsize + 1;
    let rightPortionNumber = portionNumber * portionsize;
    return (
        <div className={s.Paginator}>
            {portionNumber > 1 &&
            <button onClick={()=>{setPortionNumber(portionNumber - 1)}}>Назад</button>}

                    
                        {pages
                            .filter(p=> p>= leftPortionNumber && p<=rightPortionNumber)
                            .map((p)=>
                        {
                            return <span 
                            //@ts-ignore 
                            className={currentPage === p && s.selected}
                            onClick={(e)=>{onPageChanged(p);}}
                            >
                                {p}
                            </span>
                        })}
                   

            {portionCount > portionNumber  &&
            <button onClick={()=>{setPortionNumber(portionNumber + 1)}}>Вперед</button>}        
        </div>
    )
}

export default Paginator;