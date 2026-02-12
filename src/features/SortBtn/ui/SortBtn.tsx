import {Button} from "@/shared/ui";
import {ArrowDownAZ} from "lucide-react";
import {ArrowDownZA} from "lucide-react";

interface SortBtnProps {
    setNewSort: (newSort: string) => void
}

const SortBtn = (props: SortBtnProps) => {

    const {setNewSort} = props

    return (

        <div className={`flex gap-x-2`}>
            <Button onClick={()=> setNewSort(`name`)} className={`cursor-pointer`}>
                <ArrowDownAZ/>
            </Button>
            <Button onClick={()=> setNewSort(`-name`)} className={`cursor-pointer`}>
                <ArrowDownZA/>
            </Button>
        </div>
    );
};

export default SortBtn;