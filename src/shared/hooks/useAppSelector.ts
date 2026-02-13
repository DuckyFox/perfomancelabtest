import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/types.ts";
export const useAppSelector = useSelector.withTypes<RootState>();
