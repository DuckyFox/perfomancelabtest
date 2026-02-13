import { CategoryFilter } from "@/features/CategoryFilter";

interface FiltersProps {
    setNewCategory: (newCategory: string) => void;
    currentCategory?: string;
}

const Filters = (props: FiltersProps) => {
    const { setNewCategory, currentCategory } = props;

    return (
        <div className={`fixed flex flex-col items-center`}>
            <h2 className={`text - lg font-semibold text-foreground mb-6`}>Фильтры по товарам</h2>
            <div className={`space-y-6`}>
                <CategoryFilter currentCategory={currentCategory} setNewCategory={setNewCategory} />
            </div>
        </div>
    );
};

export default Filters;
