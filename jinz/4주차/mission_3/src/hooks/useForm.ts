import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, FormData } from "../utils/signUpSchema";

const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange"
})


