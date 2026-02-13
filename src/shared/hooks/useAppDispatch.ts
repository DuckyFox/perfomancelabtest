import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store/types.ts";
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
