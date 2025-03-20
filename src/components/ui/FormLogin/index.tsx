import {useTransition} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";

import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {schemaLogin} from "@/types/User";
import {IoReloadOutline} from "react-icons/io5";
import {useAuthStore} from "@/store/useAuthStore";

export function FormLogin() {
  const [isPending, startTransition] = useTransition();
  const {login} = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<z.infer<typeof schemaLogin>>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: "",
      role: "CLIENT"
    }
  });

  async function onSubmit(values: z.infer<typeof schemaLogin>) {
    startTransition(async () => {
      login(values.username, values.role);
      if (values.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      reset();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Usuario</Label>
        <Input placeholder="jotredev" id="username" {...register("username")} />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role">Rol</Label>
        <select
          {...register("role")}
          className="h-10 rounded-full border border-border outline-none px-3"
        >
          <option value="CLIENT">Cliente</option>
          <option value="ADMIN">Admin</option>
        </select>
        {errors.role && (
          <p className="text-xs text-red-500">{errors.role.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full h-10 bg-primary text-white rounded-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <IoReloadOutline className="size-4 animate-spin" />
            Ingresando...
          </>
        ) : (
          "Iniciar sesión"
        )}
      </button>
    </form>
  );
}
