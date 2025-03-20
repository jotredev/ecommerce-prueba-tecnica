import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";

export function FormBilling() {
  return (
    <form className="space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Combre completo</Label>
        <Input placeholder="Antonio Montes De Carrvajal" id="name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input placeholder="6145221122" id="phone" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input type="email" placeholder="example@gmail.com" id="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">País</Label>
        <Input placeholder="México" id="country" />
      </div>
    </form>
  );
}
