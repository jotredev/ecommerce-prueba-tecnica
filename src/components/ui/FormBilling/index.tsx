import {z} from "zod";
import {useForm} from "react-hook-form";

import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {zodResolver} from "@hookform/resolvers/zod";
import {schemaLocation} from "@/types/Client";
import {useEffect, useState, useTransition} from "react";
import {registerLocation} from "@/actions/submit-location-client";
import {toast} from "sonner";
import {IoReloadOutline} from "react-icons/io5";

export function FormBilling() {
  const [isPending, startTransition] = useTransition();
  const [isValidCountry, setIsValidCountry] = useState<boolean>(false);

  useEffect(() => {
    (() => {
      const customerInfo = localStorage.getItem("customer-info");

      if (customerInfo) {
        const {country} = JSON.parse(customerInfo);

        if (country) {
          setIsValidCountry(true);
        }
      }
    })();
  }, [isValidCountry]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<z.infer<typeof schemaLocation>>({
    resolver: zodResolver(schemaLocation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      country: ""
    }
  });

  async function onSubmit(values: z.infer<typeof schemaLocation>) {
    startTransition(async () => {
      const {response, message} = await registerLocation(values);

      if (response === "error") {
        toast.error(message);
      } else {
        toast.success(message);
        setIsValidCountry(true);
        reset();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Combre completo</Label>
        <Input
          placeholder="Antonio Montes De Carrvajal"
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input placeholder="6145221122" id="phone" {...register("phone")} />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">País</Label>
        <select
          {...register("country")}
          className="h-10 rounded-full border border-border outline-none px-3"
        >
          <option value="CO">Colombia</option>
          <option value="CN">China</option>
          <option value="US">Estados Unidos</option>
          <option value="FR">Francia</option>
          <option value="HO">Holanda</option>
          <option value="GP">Guadalupe</option>
          <option value="MX">México</option>
        </select>
        {errors.country && (
          <p className="text-xs text-red-500">{errors.country.message}</p>
        )}
      </div>
      {isValidCountry ? (
        <p className="text-xs text-green-500">
          <strong>Nota:</strong> Ya has registrado un país de la región de
          América
        </p>
      ) : (
        <button
          className="flex items-center justify-center gap-2 h-10 rounded-full w-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <IoReloadOutline className="size-4 animate-spin" />
              Verificando...
            </>
          ) : (
            "Verificar disponibilidad de envío"
          )}
        </button>
      )}
    </form>
  );
}
