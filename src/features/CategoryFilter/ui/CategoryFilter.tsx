import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui";

interface CategoryFilterProps {
    setNewCategory: (newCategory: string) => void;
    currentCategory?: string;
}

const CategoryFilter = (props: CategoryFilterProps) => {
    const { setNewCategory, currentCategory } = props;

    const categories: string[] = ["еда", "электроника", "одежда"];

    return (
        <div
            className={`flex flex-col gap-4 p-6 bg-background border border-border rounded-lg shadow-sm`}
        >
            <h3 className={`text-lg font-semibold text-foreground`}>Выберите категорию</h3>
            <div className={`flex flex-col items-center gap-4`}>
                <Select
                    value={currentCategory || ""}
                    onValueChange={(value) => setNewCategory(value)}
                >
                    <SelectTrigger className={`w-full max-w-xs`}>
                        <SelectValue placeholder={`Все`} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {categories.map((category: string) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={() => setNewCategory("")}>Сбросить</Button>
            </div>
        </div>
    );
};

export default CategoryFilter;
