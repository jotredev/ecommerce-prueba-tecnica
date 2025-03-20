import {Container} from "@/components/ui/Container";
import {Title} from "@/components/ui/Title";
import {FormLogin} from "@/components/ui/FormLogin";

export function LoginPage() {
  return (
    <Container className="max-w-md mx-auto">
      <Title className="mb-6 text-center">Iniciar Sesión</Title>
      <FormLogin />
    </Container>
  );
}
