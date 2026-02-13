import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input.tsx";
import { Button } from "@/shared/ui";

const ProductSearch = () => {
    return (
        <div className={`self-center flex w-2xl items-center gap-x-4`}>
            <Input value={`json server не имеет query параметра для поиска по части текста`} />
            <Button disabled={true} className={`cursor-pointer`}>
                Найти
                <Search />
            </Button>
        </div>
    );
};

export default ProductSearch;
