import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { UserBadge } from "./UserBadge"

export const TransferCard = ({firstname,lastname,userId})=>{
    const navigate = useNavigate();
    const onSendMoney = ()=>{
        navigate(`/sendmoney?name=${firstname}&userId=${userId}`)
    }
    return (
        <div className="flex justify-between py-2">
            <div className="flex gap-2">
                <UserBadge name={firstname}/>
                <p>{firstname} {lastname}</p>
            </div>
            <Button text={"Send Money"} onClick={onSendMoney}/>
        </div>
    )
}